"use client";

import { SUPPORTED_LANGUAGES, LanguageCode, UI_TRANSLATIONS } from "@/lib/constants/languages";

export interface LanguageToggleProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export default function LanguageToggle({
  currentLanguage,
  onLanguageChange,
}: LanguageToggleProps) {
  const currentLabels = UI_TRANSLATIONS[currentLanguage];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-3 sm:px-4 sm:py-2.5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold">
          🌐
        </span>
        <span>{currentLabels.languageSelectLabel}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code as LanguageCode)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-accent text-white shadow-sm ring-2 ring-accent/30 font-semibold scale-[1.02]"
                  : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200/70"
              }`}
            >
              <span className="font-sans">{lang.nativeName}</span>
              {lang.code !== "en" && (
                <span className={`ml-1 text-[10px] ${isActive ? "text-green-200" : "text-zinc-400"}`}>
                  ({lang.name})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
