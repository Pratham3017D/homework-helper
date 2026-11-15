"use client";

import { useState } from "react";
import { PracticeProblem } from "@/schemas/content";
import { UILabels, UI_TRANSLATIONS } from "@/lib/constants/languages";

export interface PracticeSetProps {
  problems: PracticeProblem[];
  labels?: UILabels;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "1. Easy", color: "bg-emerald-100 text-emerald-800" },
  "easy-medium": { label: "2. Easy-Medium", color: "bg-teal-100 text-teal-800" },
  medium: { label: "3. Medium", color: "bg-blue-100 text-blue-800" },
  "medium-hard": { label: "4. Medium-Hard", color: "bg-indigo-100 text-indigo-800" },
  challenge: { label: "5. Challenge", color: "bg-purple-100 text-purple-800" },
};

export default function PracticeSet({
  problems,
  labels = UI_TRANSLATIONS.en,
}: PracticeSetProps) {
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});

  function toggleHint(id: string) {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAnswer(id: string) {
    setOpenAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-zinc-950 sm:text-2xl">
            {labels.practiceHeading}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            {labels.practiceSubtext}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {problems.map((problem, index) => {
          const diffBadge =
            DIFFICULTY_LABELS[problem.difficulty] || {
              label: problem.difficulty,
              color: "bg-zinc-100 text-zinc-800",
            };
          const showHint = !!openHints[problem.id];
          const showAnswer = !!openAnswers[problem.id];

          return (
            <div
              key={problem.id}
              className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm transition hover:border-zinc-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${diffBadge.color}`}
                >
                  {diffBadge.label}
                </span>
                <span className="text-xs font-medium text-zinc-400">
                  {labels.problemOf} {index + 1} / {problems.length}
                </span>
              </div>

              {/* Question */}
              <p className="text-base font-semibold text-zinc-900 leading-relaxed sm:text-lg">
                {problem.question}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleHint(problem.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                    showHint
                      ? "border-amber-300 bg-amber-50 text-amber-900"
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {showHint ? labels.hideHint : labels.showHint}
                </button>

                <button
                  type="button"
                  onClick={() => toggleAnswer(problem.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                    showAnswer
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {showAnswer ? labels.hideAnswer : labels.revealAnswer}
                </button>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="mt-3 rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4 text-sm text-amber-900">
                  <span className="font-bold block mb-1">
                    {labels.showHint.replace("💡 ", "")}:
                  </span>
                  <p className="leading-relaxed">{problem.hint}</p>
                </div>
              )}

              {/* Answer & Solution Box */}
              {showAnswer && (
                <div className="mt-3 rounded-2xl border border-emerald-200/90 bg-emerald-50/70 p-4 text-sm text-emerald-950">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-emerald-900">{labels.answerLabel}</span>
                    <span className="font-semibold text-zinc-900 bg-white px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      {problem.answer}
                    </span>
                  </div>

                  {problem.solution_steps && problem.solution_steps.length > 0 && (
                    <div className="mt-3 border-t border-emerald-200/70 pt-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1.5">
                        {labels.solutionStepsLabel}
                      </span>
                      <ol className="list-decimal list-inside space-y-1 text-zinc-800">
                        {problem.solution_steps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
