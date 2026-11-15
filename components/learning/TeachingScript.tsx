import React from "react";
import { UILabels, UI_TRANSLATIONS } from "@/lib/constants/languages";

export interface TeachingScriptProps {
  script: string;
  labels?: UILabels;
}

export default function TeachingScript({
  script,
  labels = UI_TRANSLATIONS.en,
}: TeachingScriptProps) {
  return (
    <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-green-50/40 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent text-white text-sm">
          💬
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          {labels.teachingScriptHeading}
        </span>
      </div>

      <blockquote className="relative mt-2 pl-4 border-l-4 border-accent text-zinc-800 text-base sm:text-lg italic leading-relaxed">
        &ldquo;{script}&rdquo;
      </blockquote>

      <p className="mt-4 text-xs text-zinc-500">
        {labels.teachingScriptSubtext}
      </p>
    </div>
  );
}
