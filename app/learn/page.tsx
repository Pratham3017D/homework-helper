import LearnView from "@/components/learning/LearnView";
import { LanguageCode, SUPPORTED_LANGUAGES, SUPPORTED_LANGUAGE_CODES } from "@/lib/constants/languages";
import { generateContentFromAI } from "@/lib/ai/generate-content";
import { getLocalizedContent } from "@/lib/fixtures/translations";
import { verifyEducationalContent } from "@/lib/verification/math-verifier";
import { GeneratedContent } from "@/schemas/content";

interface LearnPageProps {
  searchParams: Promise<{
    topic?: string;
    grade?: string;
    subject?: string;
    lang?: string;
  }>;
}

export interface ContentMetadata {
  source: "ai-live" | "offline-fixture";
  provider: string;
  model: string;
  verificationStatus: "schema_validated" | "verified" | "not_verified" | "verification_failed";
  verificationSummary?: string;
  fallbackUsed: boolean;
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;

  const rawTopic = params.topic?.trim() || "Fractions";
  const rawGrade = Number(params.grade);
  const grade = !isNaN(rawGrade) && rawGrade >= 1 && rawGrade <= 8 ? rawGrade : 4;
  const rawSubject = params.subject?.trim() || "Mathematics";
  const rawLang = params.lang?.trim() || "en";
  const lang: LanguageCode = (SUPPORTED_LANGUAGE_CODES as readonly string[]).includes(rawLang)
    ? (rawLang as LanguageCode)
    : "en";

  const topic = rawTopic.slice(0, 160);
  const subject = rawSubject.slice(0, 50);

  const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const languageName = langObj ? langObj.name : "English";

  let initialContent: GeneratedContent;
  let initialMetadata: ContentMetadata;

  const hasApiKey = Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY);

  if (hasApiKey) {
    try {
      const aiResult = await generateContentFromAI(topic, grade, subject, languageName);
      initialContent = aiResult.content;
      const verification = verifyEducationalContent(initialContent);

      initialMetadata = {
        source: "ai-live",
        provider: aiResult.provider,
        model: aiResult.model,
        verificationStatus: verification.overallStatus,
        verificationSummary: verification.summary,
        fallbackUsed: aiResult.fallbackUsed,
      };
    } catch (err) {
      console.warn(`[LearnPage] SSR generation failed for "${topic}":`, (err as Error).message);
      initialContent = getLocalizedContent(topic, grade, subject, lang);
      const verification = verifyEducationalContent(initialContent);

      initialMetadata = {
        source: "offline-fixture",
        provider: "local-engine",
        model: "offline-curriculum",
        verificationStatus: verification.overallStatus,
        verificationSummary: verification.summary,
        fallbackUsed: true,
      };
    }
  } else {
    initialContent = getLocalizedContent(topic, grade, subject, lang);
    const verification = verifyEducationalContent(initialContent);

    initialMetadata = {
      source: "offline-fixture",
      provider: "local-engine",
      model: "offline-curriculum",
      verificationStatus: verification.overallStatus,
      verificationSummary: verification.summary,
      fallbackUsed: false,
    };
  }

  return (
    <LearnView
      initialTopic={topic}
      initialGrade={grade}
      initialSubject={subject}
      initialLanguage={lang}
      initialContent={initialContent}
      initialMetadata={initialMetadata}
    />
  );
}
