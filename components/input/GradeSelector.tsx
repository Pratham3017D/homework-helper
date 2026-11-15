"use client";

import React from "react";

export interface GradeSelectorProps {
  id?: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function GradeSelector({
  id = "grade",
  value,
  onChange,
  error,
  disabled = false,
}: GradeSelectorProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-zinc-800"
      >
        Grade
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`h-12 w-full appearance-none rounded-xl border bg-zinc-50/70 px-4 pr-10 text-sm text-zinc-900 outline-none transition hover:border-zinc-300 focus:border-accent focus:bg-white focus:ring-4 focus:ring-green-900/5 ${
            error ? "border-red-400" : "border-zinc-200"
          }`}
        >
          <option value="" disabled>
            Select grade
          </option>
          {Array.from({ length: 8 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              Grade {index + 1}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
