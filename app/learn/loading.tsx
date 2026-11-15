export default function LearnLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-zinc-200" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-zinc-100" />
        </div>

        {/* Action Bar Skeleton */}
        <div className="my-6 flex items-center justify-between">
          <div className="h-5 w-28 animate-pulse rounded bg-zinc-200" />
          <div className="h-9 w-36 animate-pulse rounded-xl bg-zinc-200" />
        </div>

        {/* Language Toggle Skeleton */}
        <div className="mb-6 h-10 w-full max-w-md animate-pulse rounded-xl bg-zinc-100" />

        {/* Status banner */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent-soft/30 p-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Generating complete teaching notes with Google Gemini AI...
            </p>
            <p className="text-xs text-zinc-500">
              Structuring parent briefing, key definitions, core rules, analogies, and practice problems.
            </p>
          </div>
        </div>

        {/* Content Skeletons */}
        <div className="space-y-6">
          <div className="h-44 w-full animate-pulse rounded-2xl border border-border bg-card p-6" />
          <div className="h-64 w-full animate-pulse rounded-2xl border border-border bg-card p-6" />
          <div className="h-36 w-full animate-pulse rounded-2xl border border-border bg-card p-6" />
        </div>
      </div>
    </div>
  );
}
