import LearnView from "@/components/learning/LearnView";
import { LanguageCode, SUPPORTED_LANGUAGES } from "@/lib/constants/languages";
import { generateContentFromAI } from "@/lib/ai/generate-content";

interface LearnPageProps {
  searchParams: Promise<{
    topic?: string;
    grade?: string;
    subject?: string;
    lang?: string;
  }>;
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;

  const topic = params.topic?.trim() || "Fractions";
  const grade = Number(params.grade) || 4;
  const subject = params.subject?.trim() || "Mathematics";
  const lang = (params.lang?.trim() || "en") as LanguageCode;

  const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const languageName = langObj ? langObj.name : "English";

  let initialContent;
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY);

  if (hasApiKey) {
    try {
      initialContent = await generateContentFromAI(topic, grade, subject, languageName);
    } catch (err) {
      console.warn("Live AI generation fallback:", err);
      initialContent = undefined;
    }
  }

  return (
    <LearnView
      initialTopic={topic}
      initialGrade={grade}
      initialSubject={subject}
      initialLanguage={lang}
      initialContent={initialContent}
    />
  );
}
