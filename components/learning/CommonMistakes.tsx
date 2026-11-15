import React from "react";
import { UILabels, UI_TRANSLATIONS } from "@/lib/constants/languages";

export interface CommonMistakesProps {
  mistakes: string[];
  labels?: UILabels;
}

export default function CommonMistakes({
  mistakes,
  labels = UI_TRANSLATIONS.en,
}: CommonMistakesProps) {
  return (
    <div className="rounded-3xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500 text-white text-sm font-bold">
          ⚠️
        </span>
        <h3 className="text-base font-bold text-amber-950 sm:text-lg">
          {labels.commonMistakesHeading}
        </h3>
      </div>

      <ul className="space-y-3">
        {mistakes.map((mistake, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 sm:text-base">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-bold mt-0.5">
              ✕
            </span>
            <span className="leading-relaxed">{mistake}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
