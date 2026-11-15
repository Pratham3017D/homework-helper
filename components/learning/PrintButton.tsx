"use client";

import React from "react";

export interface PrintButtonProps {
  label?: string;
}

export default function PrintButton({ label = "Print Worksheet" }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
    >
      <span>🖨️</span> {label}
    </button>
  );
}
