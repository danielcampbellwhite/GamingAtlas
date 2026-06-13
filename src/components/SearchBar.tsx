"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Reusable search input. On submit it navigates to the global /search page with
 * the query string, where the static client-side index is filtered.
 */
export default function SearchBar({
  placeholder = "Search gaming history…",
  autoFocus = false,
  defaultValue = "",
}: {
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          name="q"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search Gaming Atlas"
          className="w-full rounded-xl border border-white/10 bg-ink-800/80 py-3 pl-11 pr-28 text-sm text-white placeholder:text-slate-500 focus:border-atlas-400/60 focus:outline-none focus:ring-2 focus:ring-atlas-400/30"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-atlas-500 px-4 py-1.5 text-sm font-semibold text-ink-950 transition hover:bg-atlas-400"
        >
          Search
        </button>
      </div>
    </form>
  );
}
