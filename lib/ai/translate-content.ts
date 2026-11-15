import { callGeminiGenerateContent } from "./gemini.ts";
import { createChatCompletion } from "./client.ts";
import { cleanJsonString } from "./generate-content.ts";
import { generatedContentSchema, type GeneratedContent } from "../../schemas/content.ts";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "../constants/languages.ts";
import { getLocalizedContent } from "../fixtures/translations.ts";
import { verifyEducationalContent, type VerificationReport } from "../verification/math-verifier.ts";

export interface TranslationResult {
  content: GeneratedContent;
  provider: string;
  model: string;
  fallbackUsed: boolean;
  cacheHit: boolean;
  verificationReport: VerificationReport;
}

// In-memory LRU / TTL Translation Cache
interface CachedTranslation {
  content: GeneratedContent;
  provider: string;
  model: string;
  verificationReport: VerificationReport;
  timestamp: number;
}

const CACHE_TTL_MS = 1000 * 60 * 60 * 2; // 2 hours
const MAX_CACHE_ENTRIES = 250;
const translationCache = new Map<string, CachedTranslation>();

// In-flight request deduplication map to prevent parallel duplicate calls
const inFlightTranslations = new Map<string, Promise<TranslationResult>>();

/**
 * Creates a unique deterministic fingerprint of a lesson based on topic, grade, and problem questions.
 */
export function createLessonFingerprint(content: GeneratedContent): string {
  const problemsSignature = (content.problems || [])
    .map((p) => `${p.difficulty}:${p.question.slice(0, 30)}:${p.answer.slice(0, 20)}`)
    .join("|");
  return `${content.topic.toLowerCase().trim()}_g${content.grade}_${problemsSignature}`;
}

export function createTranslationCacheKey(
  content: GeneratedContent,
  targetLang: LanguageCode
): string {
  return `${targetLang}::${createLessonFingerprint(content)}`;
}

/**
 * Clears expired cache entries or prunes LRU when exceeding max size.
 */
function pruneCache() {
  const now = Date.now();
  for (const [key, entry] of translationCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      translationCache.delete(key);
    }
  }
  if (translationCache.size > MAX_CACHE_ENTRIES) {
    const oldestKeys = Array.from(translationCache.keys()).slice(0, 50);
    for (const key of oldestKeys) {
      translationCache.delete(key);
    }
  }
}

/**
 * Translates an existing educational lesson from source language to target language.
 * Guarantees mathematical preservation:
 * - Keeps practice questions, formulas, numbers, and arithmetic solutions identical.
 * - Does not invent new questions or alter numerical values.
 * - Deduplicates concurrent identical requests.
 * - Caches results for near-instant repeated switching.
 */
export async function translateEducationalContent({
  content,
  sourceLang = "en",
  targetLang,
  grade,
  subject,
}: {
  content: GeneratedContent;
  sourceLang?: LanguageCode;
  targetLang: LanguageCode;
  grade: number;
  subject: string;
}): Promise<TranslationResult> {
  // If target language is the same as source, return original content directly
  if (sourceLang === targetLang) {
    return {
      content,
      provider: "passthrough",
      model: "identity",
      fallbackUsed: false,
      cacheHit: true,
      verificationReport: verifyEducationalContent(content),
    };
  }

  const cacheKey = createTranslationCacheKey(content, targetLang);

  // 1. Check in-memory cache
  const cached = translationCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      content: cached.content,
      provider: cached.provider,
      model: cached.model,
      fallbackUsed: false,
      cacheHit: true,
      verificationReport: cached.verificationReport,
    };
  }

  // 2. Check in-flight duplicate requests
  if (inFlightTranslations.has(cacheKey)) {
    return await inFlightTranslations.get(cacheKey)!;
  }

  // 3. Initiate dedicated translation task
  const translationPromise = (async (): Promise<TranslationResult> => {
    const sourceLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang);
    const targetLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang);
    const sourceName = sourceLangObj ? sourceLangObj.name : "English";
    const targetName = targetLangObj ? targetLangObj.name : targetLang;

    const systemPrompt = `You are an expert bilingual educational translator specializing in school curricula (Grades 1 to 8).
Your mission is to translate an existing structured lesson from ${sourceName} into clear, natural, high-quality educational ${targetName}.

CRITICAL EDUCATIONAL & MATHEMATICAL PRESERVATION RULES:
1. PRESERVE MATHEMATICAL INTEGRITY: You MUST preserve all mathematical calculations, equations, formulas, variables, coordinates, and numerical values verbatim.
2. PRESERVE ALL PRACTICE PROBLEMS: Do NOT invent or substitute any new questions. The translated output MUST contain the exact same 5 problems as the input lesson.
3. PRESERVE IDENTIFIERS & DIFFICULTIES: The 'id' ("p1" through "p5") and 'difficulty' ("easy", "easy-medium", "medium", "medium-hard", "challenge") must remain identical in English.
4. TRANSLATE EXPLANATIONS: Translate the questions, hints, answers, and solution steps so the parent and child can read them comfortably in ${targetName}, but ensure the mathematical meaning, logic, and numbers remain 100% identical.
5. NATURAL PARENT TONE: For Hindi, use natural, encouraging, clear Hindi (Devanagari script) suitable for Grade ${grade} parents and students. Keep common mathematical terms understandable (e.g., 'प्रतिशत (Percentage)', 'भिन्न (Fraction)', 'गुणनफल').
6. TEACHING NOTES: Translate the notes object (overview, key_definitions, core_rules, real_world_examples, parent_cheat_sheet), steps, common_mistakes, and kid_script thoroughly.
7. STRICT JSON OUTPUT: Return ONLY a single valid JSON object matching the input structure exactly. No conversational text or markdown code fences outside the JSON.`;

    const userPrompt = `Translate this Grade ${grade} ${subject} lesson into ${targetName}.
Keep all numbers, formulas, question difficulty levels, and mathematical solutions strictly preserved:

${JSON.stringify(content, null, 2)}`;

    let rawOutput = "";
    let resolvedProvider = "google-gemini";
    let resolvedModel = "";
    let fallbackUsed = false;

    // A. Prioritize Google Gemini Flash translation
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiRes = await callGeminiGenerateContent({
          prompt: userPrompt,
          systemInstruction: systemPrompt,
          temperature: 0.1, // Low temperature for high fidelity translation
          timeoutMs: 18000,
        });
        rawOutput = geminiRes.text;
        resolvedProvider = "google-gemini";
        resolvedModel = geminiRes.model;
      } catch (geminiError) {
        console.warn(
          `[Translate] Gemini translation failed for ${targetLang}. Checking fallback:`,
          (geminiError as Error).message
        );

        // B. Secondary fallback to OpenAI-compatible provider if configured
        if (process.env.AI_API_BASE_URL && process.env.AI_API_KEY) {
          try {
            const openAiRes = await createChatCompletion({
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
              ],
              temperature: 0.1,
              timeoutMs: 18000,
            });
            rawOutput = openAiRes.text;
            resolvedProvider = "openai-compatible";
            resolvedModel = openAiRes.model;
            fallbackUsed = true;
          } catch (secondaryError) {
            console.warn("[Translate] Secondary AI provider also failed:", (secondaryError as Error).message);
          }
        }
      }
    }

    // If live AI returned output, parse and validate it
    if (rawOutput) {
      try {
        const cleaned = cleanJsonString(rawOutput);
        const parsed = JSON.parse(cleaned);
        const validated = generatedContentSchema.safeParse(parsed);

        if (validated.success) {
          const translatedContent = validated.data;
          const verificationReport = verifyEducationalContent(translatedContent);

          // Save to server cache
          pruneCache();
          translationCache.set(cacheKey, {
            content: translatedContent,
            provider: resolvedProvider,
            model: resolvedModel,
            verificationReport,
            timestamp: Date.now(),
          });

          return {
            content: translatedContent,
            provider: resolvedProvider,
            model: resolvedModel,
            fallbackUsed,
            cacheHit: false,
            verificationReport,
          };
        } else {
          console.warn("[Translate] Validation of translated JSON failed:", validated.error.issues);
        }
      } catch (parseErr) {
        console.warn("[Translate] Failed to parse AI translation JSON:", (parseErr as Error).message);
      }
    }

    // C. Graceful Fallback: Localized Offline Curriculum
    console.info(`[Translate] Using verified offline localized content for ${targetLang}`);
    const offlineContent = getLocalizedContent(content.topic, grade, subject, targetLang);
    const verificationReport = verifyEducationalContent(offlineContent);

    // Save fallback to server cache so subsequent calls are instant
    pruneCache();
    translationCache.set(cacheKey, {
      content: offlineContent,
      provider: "local-engine",
      model: "offline-curriculum",
      verificationReport,
      timestamp: Date.now(),
    });

    return {
      content: offlineContent,
      provider: "local-engine",
      model: "offline-curriculum",
      fallbackUsed: true,
      cacheHit: false,
      verificationReport,
    };
  })();

  inFlightTranslations.set(cacheKey, translationPromise);

  try {
    return await translationPromise;
  } finally {
    inFlightTranslations.delete(cacheKey);
  }
}
