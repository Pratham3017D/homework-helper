import React from "react";
import { TeachingNotes as TeachingNotesType } from "@/schemas/content";
import { UILabels, UI_TRANSLATIONS } from "@/lib/constants/languages";

export interface TeachingNotesProps {
  notes?: TeachingNotesType;
  labels?: UILabels;
}

export default function TeachingNotes({
  notes,
  labels = UI_TRANSLATIONS.en,
}: TeachingNotesProps) {
  if (!notes) return null;

  const hasDefinitions = notes.key_definitions && notes.key_definitions.length > 0;
  const hasRules = notes.core_rules && notes.core_rules.length > 0;
  const hasExamples = notes.real_world_examples && notes.real_world_examples.length > 0;
  const hasCheatSheet = notes.parent_cheat_sheet && notes.parent_cheat_sheet.length > 0;

  return (
    <div className="rounded-3xl border border-indigo-200/80 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-indigo-100 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-base font-bold shadow-sm">
            📚
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Study & Teaching Notes
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
          {labels.notesHeading}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
          {labels.notesSubtext}
        </p>
      </div>

      <div className="mt-6 space-y-7">
        {/* Overview in-depth notes */}
        {notes.overview && (
          <div className="rounded-2xl bg-indigo-50/50 border border-indigo-100/80 p-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-900 mb-2 flex items-center gap-1.5">
              <span>📖</span> Concept Breakdown
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-700 font-normal">
              {notes.overview}
            </p>
          </div>
        )}

        {/* Key Terms & Definitions */}
        {hasDefinitions && (
          <div>
            <h4 className="text-base font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold">
                🔑
              </span>
              {labels.keyTermsHeading}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notes.key_definitions!.map((def, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 transition hover:bg-white hover:border-indigo-300"
                >
                  <span className="font-bold text-sm text-indigo-900 block mb-1">
                    {def.term}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {def.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Rules & Formulas */}
        {hasRules && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
            <h4 className="text-base font-bold text-blue-950 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-200 text-blue-800 text-xs font-bold">
                📐
              </span>
              {labels.coreRulesHeading}
            </h4>

            <ul className="space-y-2.5">
              {notes.core_rules!.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-800 font-medium">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Real-World Examples */}
        {hasExamples && (
          <div>
            <h4 className="text-base font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                🌍
              </span>
              {labels.realWorldHeading}
            </h4>

            <div className="space-y-2.5">
              {notes.real_world_examples!.map((example, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-200 bg-emerald-50/30 p-3.5 text-sm text-zinc-700 flex items-start gap-2.5"
                >
                  <span className="text-base mt-0.5">👉</span>
                  <span className="leading-relaxed">{example}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cheat Sheet */}
        {hasCheatSheet && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <h4 className="text-base font-bold text-amber-950 mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-200 text-amber-900 text-xs font-bold">
                ⚡
              </span>
              {labels.cheatSheetHeading}
            </h4>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-amber-950">
              {notes.parent_cheat_sheet!.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/70 rounded-xl p-2.5 border border-amber-100">
                  <span className="font-bold text-amber-700 shrink-0">✓</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
