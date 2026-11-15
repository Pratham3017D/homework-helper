"use client";

import { useState, useEffect, useRef } from "react";
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
import { ContentMetadata } from "@/app/learn/page";

export interface LearnViewProps {
  initialTopic: string;
  initialGrade: number;
  initialSubject: string;
  initialLanguage?: LanguageCode;
  initialContent?: GeneratedContent;
  initialMetadata?: ContentMetadata;
}

export default function LearnView({
  initialTopic,
  initialGrade,
  initialSubject,
  initialLanguage = "en",
  initialContent,
  initialMetadata,
}: LearnViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(initialLanguage);
  const [contentByLang, setContentByLang] = useState<Partial<Record<LanguageCode, GeneratedContent>>>(() => {
    if (initialContent) {
      return { [initialLanguage]: initialContent };
    }
    return {};
  });

  const [metadataByLang, setMetadataByLang] = useState<Partial<Record<LanguageCode, ContentMetadata>>>(() => {
    if (initialMetadata) {
      return { [initialLanguage]: initialMetadata };
    }
    return {};
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inFlightRef = useRef<Set<LanguageCode>>(new Set());

  const labels = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS.en;

  // Active content for current language:
  // If current language is already cached, show it.
  // If translation is currently in-flight, keep displaying the base English lesson so the parent can keep reading.
  // Otherwise fallback to localized fixture.
  const baseEnglishContent = contentByLang["en"] || initialContent;
  const isTranslating = isLoading && !contentByLang[selectedLanguage];

  const content: GeneratedContent =
    contentByLang[selectedLanguage] ||
    (isTranslating && baseEnglishContent
      ? baseEnglishContent
      : getLocalizedContent(initialTopic, initialGrade, initialSubject, selectedLanguage));

  const activeMetadata: ContentMetadata = metadataByLang[selectedLanguage] || {
    source: "offline-fixture",
    provider: "local-engine",
    model: "offline-curriculum",
    verificationStatus: "schema_validated",
    fallbackUsed: true,
  };

  // If initialContent was not passed from SSR, fetch in client
  useEffect(() => {
    let ignore = false;

    if (!initialContent && !inFlightRef.current.has(initialLanguage)) {
      inFlightRef.current.add(initialLanguage);

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
            if (data.metadata) {
              setMetadataByLang((prev) => ({
                ...prev,
                [initialLanguage]: data.metadata,
              }));
            }
          }
        })
        .catch((err) => {
          console.warn("[LearnView] Initial client fetch error:", err);
        })
        .finally(() => {
          inFlightRef.current.delete(initialLanguage);
        });
    }

    return () => {
      ignore = true;
    };
  }, [initialTopic, initialGrade, initialSubject, initialLanguage, initialContent]);

  const handleLanguageChange = async (newLang: LanguageCode) => {
    setSelectedLanguage(newLang);
    setErrorMsg("");

    // If already generated or translated for this language, switch immediately (0ms)
    if (contentByLang[newLang]) return;

    // Prevent duplicate in-flight requests for the same language
    if (inFlightRef.current.has(newLang)) return;
    inFlightRef.current.add(newLang);

    setIsLoading(true);

    try {
      // DEDICATED TRANSLATION: If we have an existing English lesson, translate it
      // instead of regenerating an entirely new curriculum from scratch.
      const currentLesson = contentByLang["en"] || initialContent;

      let response: Response;
      if (currentLesson) {
        response = await fetch("/api/content/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: currentLesson,
            sourceLang: "en",
            targetLang: newLang,
            grade: initialGrade,
            subject: initialSubject,
          }),
        });
      } else {
        // Fallback: If no base lesson exists yet, call generate
        response = await fetch("/api/content/generate", {
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
      }

      if (response.ok) {
        const data = await response.json();
        if (data.content) {
          setContentByLang((prev) => ({
            ...prev,
            [newLang]: data.content,
          }));
          if (data.metadata) {
            setMetadataByLang((prev) => ({
              ...prev,
              [newLang]: data.metadata,
            }));
          }
          return;
        }
      }

      // If translation failed or rate limited, gracefully fall back to localized offline lesson
      const offlineFallback = getLocalizedContent(
        initialTopic,
        initialGrade,
        initialSubject,
        newLang
      );
      setContentByLang((prev) => ({
        ...prev,
        [newLang]: offlineFallback,
      }));
      setMetadataByLang((prev) => ({
        ...prev,
        [newLang]: {
          source: "offline-fixture",
          provider: "local-engine",
          model: "offline-curriculum",
          verificationStatus: "schema_validated",
          fallbackUsed: true,
        },
      }));

      if (response.status === 429) {
        setErrorMsg("Notice: Live AI rate limit reached. Displaying verified offline curriculum.");
      } else {
        setErrorMsg("Notice: Live translation temporarily unavailable. Displaying verified offline curriculum.");
      }
    } catch (err) {
      console.warn(`[LearnView] Error translating content to ${newLang}:`, err);
      const offlineFallback = getLocalizedContent(
        initialTopic,
        initialGrade,
        initialSubject,
        newLang
      );
      setContentByLang((prev) => ({
        ...prev,
        [newLang]: offlineFallback,
      }));
      setErrorMsg("Notice: Connection interrupted. Displaying verified offline curriculum.");
    } finally {
      inFlightRef.current.delete(newLang);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // Force re-fetch for the current selected language by removing cached copy
    setContentByLang((prev) => {
      const next = { ...prev };
      delete next[selectedLanguage];
      return next;
    });
    handleLanguageChange(selectedLanguage);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);
  const currentLangName = currentLangObj ? currentLangObj.name : "English";

  // Verification Badge helper
  const renderVerificationBadge = () => {
    const status = activeMetadata.verificationStatus;
    if (status === "verified") {
      return (
        <span
          className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200"
          title={activeMetadata.verificationSummary || "Independent deterministic calculations verified."}
        >
          <span>✓</span> Math Verified
        </span>
      );
    }
    if (status === "verification_failed") {
      return (
        <span
          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-800 border border-red-200"
          title={activeMetadata.verificationSummary || "A calculation contradiction was detected."}
        >
          <span>⚠️</span> Review Recommended
        </span>
      );
    }
    // schema_validated or not_verified
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 border border-zinc-200"
        title={activeMetadata.verificationSummary || "Pedagogical structure and schema validated."}
      >
        <span>✓</span> Schema Validated
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-8">
        <Header />

        {/* Action bar with Back button and Status Indicators */}
        <div className="my-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-1 py-0.5"
          >
            <span>←</span> {labels.backToSearch}
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {/* Truthful Source Badge */}
            {isTranslating ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" /> Translating to {currentLangName}...
              </span>
            ) : activeMetadata.source === "ai-live" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
                <span className="text-amber-500">✨</span> Live AI (
                {activeMetadata.provider === "google-gemini"
                  ? "Gemini"
                  : "OpenAI-Compatible"}
                )
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
                <span>📖</span> Offline Lesson Guide
              </span>
            )}

            {/* Truthful Verification Badge */}
            {renderVerificationBadge()}

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
          <div
            role="status"
            aria-live="polite"
            className="mb-6 flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 shadow-sm animate-pulse"
          >
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            <div>
              <p className="text-sm font-semibold text-indigo-950">
                Preparing complete teaching notes in {currentLangName}...
              </p>
              <p className="text-xs text-indigo-700">
                Translating parent explanations, key definitions, and practice questions.
              </p>
            </div>
          </div>
        )}

        {/* Transient warning notice with Retry */}
        {errorMsg && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800"
          >
            <span>{errorMsg}</span>
            <button
              type="button"
              onClick={handleRetry}
              className="font-bold underline hover:text-amber-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded px-1"
            >
              Retry
            </button>
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
