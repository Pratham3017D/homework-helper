import React from "react";
import { GeneratedContent } from "@/schemas/content";
import { UILabels, UI_TRANSLATIONS } from "@/lib/constants/languages";

export interface ParentBriefingProps {
  content: GeneratedContent;
  labels?: UILabels;
}

export default function ParentBriefing({
  content,
  labels = UI_TRANSLATIONS.en,
}: ParentBriefingProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
          Grade {content.grade}
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {content.subject}
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {labels.parentBriefing}
        </span>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
        {content.topic}
      </h2>

      {/* 1-sentence quick summary */}
      <div className="mt-4 rounded-2xl bg-zinc-50 border border-zinc-100 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
          {labels.quickSummary}
        </p>
        <p className="text-base text-zinc-800 leading-relaxed font-medium">
          {content.parent_summary}
        </p>
      </div>

      {/* Intuition */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-accent">
            💡
          </span>
          {labels.intuition}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
          {content.intuition}
        </p>
      </div>

      {/* Step by step method */}
      <div className="mt-6 border-t border-zinc-100 pt-6">
        <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700">
            📋
          </span>
          {labels.stepsHeading}
        </h3>

        <ol className="space-y-3">
          {content.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 sm:text-base">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
