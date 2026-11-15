"use client";

import { useEffect, useState } from "react";

export interface LoadingStateProps {
  topic?: string;
}

export default function LoadingState({ topic }: LoadingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Building a parent-friendly explanation...",
    "Breaking down the core intuition...",
    "Writing a simple teaching script...",
    "Generating 5 practice problems with hints...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="mx-auto w-full max-w-3xl py-12 px-4 sm:px-6">
      {/* Animated status banner */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <svg
            className="h-6 w-6 animate-spin text-accent"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-zinc-900">
          Preparing your teaching guide
        </h2>
        {topic && (
          <p className="mt-1 text-sm font-medium text-accent">
            Topic: &ldquo;{topic}&rdquo;
          </p>
        )}
        <p className="mt-2 text-sm text-zinc-500 animate-pulse transition-all">
          {messages[messageIndex]}
        </p>
      </div>

      {/* Skeleton cards */}
      <div className="space-y-6">
        <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-5 w-40 rounded-full bg-zinc-200 mb-4" />
          <div className="space-y-2.5">
            <div className="h-4 w-full rounded-md bg-zinc-100" />
            <div className="h-4 w-5/6 rounded-md bg-zinc-100" />
            <div className="h-4 w-4/6 rounded-md bg-zinc-100" />
          </div>
        </div>

        <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-5 w-32 rounded-full bg-zinc-200 mb-4" />
          <div className="space-y-2.5">
            <div className="h-4 w-full rounded-md bg-zinc-100" />
            <div className="h-4 w-3/4 rounded-md bg-zinc-100" />
          </div>
        </div>

        <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-5 w-48 rounded-full bg-zinc-200 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="h-20 rounded-2xl bg-zinc-100" />
            <div className="h-20 rounded-2xl bg-zinc-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
