import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-2">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm transition group-hover:bg-accent-hover">
          H
        </div>
        <span className="text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-accent transition">
          Homework Helper
        </span>
      </Link>

      <span className="hidden text-sm text-zinc-500 sm:block">
        For parents who want to help
      </span>
    </header>
  );
}
