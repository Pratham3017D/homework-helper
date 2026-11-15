"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateContentRequestSchema } from "@/schemas/requests";
import GradeSelector from "./GradeSelector";
import SubjectSelector from "./SubjectSelector";
import Button from "@/components/common/Button";

interface TopicFormProps {
  examples?: string[];
}

const EXAMPLE_PRESETS: Record<string, { grade: string; subject: string }> = {
  Fractions: { grade: "4", subject: "Mathematics" },
  Photosynthesis: { grade: "5", subject: "Science" },
  Nouns: { grade: "3", subject: "English" },
};

export default function TopicForm({ examples = ["Fractions", "Photosynthesis", "Nouns"] }: TopicFormProps) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectExample(exampleTopic: string) {
    setTopic(exampleTopic);
    setError("");
    const preset = EXAMPLE_PRESETS[exampleTopic];
    if (preset) {
      if (!grade) setGrade(preset.grade);
      if (!subject) setSubject(preset.subject);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    // Empty string becomes NaN so Zod triggers invalid_type_error / required_error
    const parsedGrade = grade.trim() ? Number(grade) : NaN;

    const result = generateContentRequestSchema.safeParse({
      topic,
      grade: parsedGrade,
      subject,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please check your input.");
      return;
    }

    setIsLoading(true);

    const queryParams = new URLSearchParams({
      topic: result.data.topic,
      grade: String(result.data.grade),
      subject: result.data.subject,
    });

    router.push(`/learn?${queryParams.toString()}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <label
                htmlFor="topic"
                className="text-lg font-semibold tracking-tight text-zinc-900"
              >
                What is your child learning?
              </label>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Tell us the topic or homework question.
              </p>
            </div>

            <span className="hidden rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent sm:block">
              Step 1
            </span>
          </div>

          {error && (
            <div
              id="topic-error"
              role="alert"
              className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <svg
                className="h-4 w-4 shrink-0 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <textarea
            id="topic"
            value={topic}
            disabled={isLoading}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "topic-error" : undefined}
            onChange={(event) => {
              setTopic(event.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. How do I explain fractions to my child?"
            maxLength={160}
            className="mt-5 min-h-32 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-green-900/5 disabled:opacity-60"
          />

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-zinc-400">
              {topic.length}/160
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <GradeSelector
            value={grade}
            onChange={(val) => {
              setGrade(val);
              if (error) setError("");
            }}
            disabled={isLoading}
          />

          <SubjectSelector
            value={subject}
            onChange={(val) => {
              setSubject(val);
              if (error) setError("");
            }}
            disabled={isLoading}
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            size="md"
            isLoading={isLoading}
            className="w-full"
          >
            Help me understand it
            <span className="ml-2 text-base">→</span>
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-zinc-400">
          We&apos;ll explain it in a way you can confidently teach your child.
        </p>
      </form>

      {examples && examples.length > 0 && (
        <div className="mt-8 text-center border-t border-zinc-100 pt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Not sure where to start? Try an example:
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleSelectExample(example)}
                disabled={isLoading}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 hover:shadow-md active:scale-95 disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
