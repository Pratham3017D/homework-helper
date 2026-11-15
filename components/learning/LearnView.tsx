"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LanguageToggle from "@/components/learning/LanguageToggle";
import ParentBriefing from "@/components/learning/ParentBriefing";
import TeachingNotes from "@/components/learning/TeachingNotes";
import TeachingScript from "@/components/learning/TeachingScript";
import CommonMistakes from "@/components/learning/CommonMistakes";
import PracticeSet from "@/components/learning/PracticeSet";
import PrintButton from "@/components/learning/PrintButton";
import { LanguageCode, UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from "@/lib/constants/languages";
import { getLocalizedContent } from "@/lib/fixtures/translations";
import { GeneratedContent } from "@/schemas/content";

export interface LearnViewProps {
  initialTopic: string;
  initialGrade: number;
  initialSubject: string;
  initialLanguage?: LanguageCode;
  initialContent?: GeneratedContent;
}

export default function LearnView({
  initialTopic,
  initialGrade,
  initialSubject,
  initialLanguage = "en",
  initialContent,
}: LearnViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(initialLanguage);
  const [contentByLang, setContentByLang] = useState<Partial<Record<LanguageCode, GeneratedContent>>>(() => {
    if (initialContent) {
      return { [initialLanguage]: initialContent };
    }
    return {};
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const labels = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS.en;

  // Active content for current language, fallback to localized fixture if not yet cached
  const content: GeneratedContent =
    contentByLang[selectedLanguage] ||
    getLocalizedContent(initialTopic, initialGrade, initialSubject, selectedLanguage);

  // If initialContent was not passed from SSR (e.g., SSR timeout or cold start), fetch in client
  useEffect(() => {
    let ignore = false;

    if (!initialContent) {
      fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: initialTopic,
          grade: initialGrade,
          subject: initialSubject,
          lang: initialLanguage,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!ignore && data.content) {
            setContentByLang((prev) => ({
              ...prev,
              [initialLanguage]: data.content,
            }));
          }
        })
        .catch((err) => {
          console.warn("[LearnView] Initial client fetch error:", err);
        });
    }

    return () => {
      ignore = true;
    };
  }, [initialTopic, initialGrade, initialSubject, initialLanguage, initialContent]);

  const handleLanguageChange = async (newLang: LanguageCode) => {
    setSelectedLanguage(newLang);

    // If already generated and cached for this language, no need to re-fetch
    if (contentByLang[newLang]) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/content/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: initialTopic,
          grade: initialGrade,
          subject: initialSubject,
          lang: newLang,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.content) {
          setContentByLang((prev) => ({
            ...prev,
            [newLang]: data.content,
          }));
          return;
        }
      }

      console.warn(`[LearnView] AI API returned non-ok status for ${newLang}`);
    } catch (err) {
      console.warn(`[LearnView] Error fetching AI content for ${newLang}:`, err);
      setErrorMsg("Notice: Using offline lesson guide. Reconnecting to AI...");
    } finally {
      setIsLoading(false);
    }
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);
  const currentLangName = currentLangObj ? currentLangObj.name : "English";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-8">
        <Header />

        {/* Action bar with Back button and Print */}
        <div className="my-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
          >
            <span>←</span> {labels.backToSearch}
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
              <span className="text-amber-500">✨</span> Gemini AI Active
            </span>
            <PrintButton label={labels.printWorksheet} />
          </div>
        </div>

        {/* Multi-language selector toggle */}
        <div className="mb-6">
          <LanguageToggle
            currentLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Loading translation banner */}
        {isLoading && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 shadow-sm animate-pulse">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            <div>
              <p className="text-sm font-semibold text-indigo-950">
                Generating teaching notes in {currentLangName} with Gemini AI...
              </p>
              <p className="text-xs text-indigo-700">
                Crafting in-depth parent explanations, definitions, and practice questions.
              </p>
            </div>
          </div>
        )}

        {/* Transient warning notice */}
        {errorMsg && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            {errorMsg}
          </div>
        )}

        {/* Main Content Area */}
        <main className="space-y-8 flex-1 pb-16">
          <ParentBriefing content={content} labels={labels} />
          {content.notes && <TeachingNotes notes={content.notes} labels={labels} />}
          <TeachingScript script={content.kid_script} labels={labels} />
          <CommonMistakes mistakes={content.common_mistakes} labels={labels} />
          <PracticeSet problems={content.problems} labels={labels} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
