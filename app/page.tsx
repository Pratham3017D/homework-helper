import TopicForm from "@/components/input/TopicForm";

const examples = ["Fractions", "Photosynthesis", "Nouns"];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
              H
            </div>

            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              Homework Helper
            </span>
          </div>

          <span className="hidden text-sm text-zinc-500 sm:block">
            For parents who want to help
          </span>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center py-10 text-center sm:py-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            A simpler way to help with homework
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-5xl">
            Homework doesn&apos;t have to be confusing.
          </h1>

          <p className="mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
            Understand the topic in 2 minutes. Help your child in 10.
          </p>

          {/* Form Card */}
          <div className="mt-10 w-full max-w-2xl text-left">
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)] sm:p-7">
              <TopicForm examples={examples} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-3 text-center text-xs text-zinc-400">
          Built to help parents teach, not just find answers.
        </footer>
      </div>
    </main>
  );
}
