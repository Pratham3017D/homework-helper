import { callGeminiGenerateContent } from "./gemini.ts";
import { createChatCompletion } from "./client.ts";
import { buildContentGenerationPrompt } from "./prompts.ts";
import { generatedContentSchema, type GeneratedContent } from "../../schemas/content.ts";

export interface AIContentGenerationResult {
  content: GeneratedContent;
  provider: "google-gemini" | "openai-compatible";
  model: string;
  fallbackUsed: boolean;
}

export function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();

  // 1. Remove markdown code block fences anywhere in the string
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, "");
  cleaned = cleaned.replace(/\n?```\s*$/i, "");
  cleaned = cleaned.replace(/```(?:json)?/gi, "").replace(/```/g, "");

  // 2. Find outermost opening and closing braces
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  // 3. Fix markdown bullets or numbered bullets before quoted array items:
  // e.g. [ \n - "item" -> [ \n "item"
  // e.g. , \n * "item" -> , \n "item"
  // e.g. , \n 1. "item" -> , \n "item"
  cleaned = cleaned.replace(/(\[\s*|\,\s*)(?:[-*•]|\d+[.)])\s+(\")/g, "$1$2");

  // Also handle line starts within arrays where bullet is preceded by newline + whitespace
  cleaned = cleaned.replace(/^(\s*)(?:[-*•]|\d+[.)])\s+(\")/gm, "$1$2");

  // 4. Fix markdown bullets before unquoted text items in arrays:
  // e.g. [ \n - Step 1: do this, -> [ \n "Step 1: do this",
  cleaned = cleaned.replace(
    /(\[\s*|\,\s*)[-*•]\s+([^"\s\[\]\{\}][^,\n\]\}]*)/g,
    (match, prefix, content) => {
      const trimmed = content.trim();
      // If it's a valid standalone number (e.g. -5), preserve it
      if (!isNaN(Number(trimmed))) {
        return `${prefix}${trimmed}`;
      }
      return `${prefix}"${trimmed.replace(/"/g, '\\"')}"`;
    }
  );

  // 5. Remove trailing commas before closing braces/brackets
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

  return cleaned.trim();
}

export async function generateContentFromAI(
  topic: string,
  grade: number,
  subject: string,
  languageName: string = "English"
): Promise<AIContentGenerationResult> {
  const messages = buildContentGenerationPrompt(
    topic,
    grade,
    subject,
    languageName
  );

  const systemInstruction = messages.find((m) => m.role === "system")?.content;
  const userPrompt = messages.find((m) => m.role === "user")?.content || "";

  let rawOutput = "";
  let resolvedProvider: "google-gemini" | "openai-compatible" = "google-gemini";
  let resolvedModel = "";
  let fallbackUsed = false;

  // 1. Prioritize Google Gemini API if configured
  if (process.env.GEMINI_API_KEY) {
    try {
      const geminiRes = await callGeminiGenerateContent({
        prompt: userPrompt,
        systemInstruction,
        temperature: 0.2,
      });
      rawOutput = geminiRes.text;
      resolvedProvider = "google-gemini";
      resolvedModel = geminiRes.model;
    } catch (geminiError) {
      console.warn(
        "[AI Orchestrator] Google Gemini provider failed. Checking fallback:",
        (geminiError as Error).message
      );

      // Attempt secondary fallback to OpenAI-compatible provider if configured
      if (process.env.AI_API_BASE_URL && process.env.AI_API_KEY) {
        try {
          const openAiRes = await createChatCompletion({
            messages,
            temperature: 0.2,
          });
          rawOutput = openAiRes.text;
          resolvedProvider = "openai-compatible";
          resolvedModel = openAiRes.model;
          fallbackUsed = true;
        } catch (secondaryError) {
          throw new Error(
            `Primary (Gemini) and Secondary (OpenAI) AI providers failed. Gemini: ${(geminiError as Error).message}. OpenAI: ${(secondaryError as Error).message}`
          );
        }
      } else {
        throw geminiError;
      }
    }
  } else if (process.env.AI_API_KEY) {
    // 2. OpenAI-compatible provider as standalone primary
    const openAiRes = await createChatCompletion({
      messages,
      temperature: 0.2,
    });
    rawOutput = openAiRes.text;
    resolvedProvider = "openai-compatible";
    resolvedModel = openAiRes.model;
  } else {
    throw new Error("No AI API credentials configured in environment variables.");
  }

  const cleanedJson = cleanJsonString(rawOutput);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanedJson);
  } catch (err) {
    console.error("[AI Orchestrator] JSON Parse Failed. Cleaned string was:", cleanedJson.slice(0, 300));
    throw new Error(`AI returned invalid JSON: ${(err as Error).message}`);
  }

  const parseResult = generatedContentSchema.safeParse(parsed);
  if (!parseResult.success) {
    console.error(
      "[AI Orchestrator] Schema Validation Error:",
      parseResult.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
    );
    throw new Error(
      `AI response failed schema validation: ${parseResult.error.issues[0]?.message}`
    );
  }

  return {
    content: parseResult.data,
    provider: resolvedProvider,
    model: resolvedModel,
    fallbackUsed,
  };
}
