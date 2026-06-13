"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { SearchItem } from "@/lib/types";

const types = ["All", "Article", "Timeline", "Console", "Record", "Legend"] as const;

const typeStyles: Record<string, string> = {
  Article: "border-magenta-500/30 bg-magenta-500/10 text-magenta-400",
  Timeline: "border-atlas-400/30 bg-atlas-500/10 text-atlas-200",
  Console: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  Record: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  Legend: "border-violet-400/30 bg-violet-500/10 text-violet-300",
};

/** Simple relevance score: title matches outrank keyword matches. */
function score(item: SearchItem, q: string): number {
  const title = item.title.toLowerCase();
  const keywords = item.keywords.toLowerCase();
  if (!q) return 0;
  let s = 0;
  if (title.includes(q)) s += 10;
  if (title.startsWith(q)) s += 5;
  if (keywords.includes(q)) s += 2;
  return s;
}

export default function SearchClient({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<(typeof types)[number]>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = index;
    if (type !== "All") items = items.filter((i) => i.type === type);
    if (!q) return type === "All" ? [] : items;
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .map(({ item }) => item);
  }, [index, query, type]);

  return (
    <div>
      <div className="mx-auto max-w-2xl">
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
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, timeline events, consoles, records, legends…"
            aria-label="Search Gaming Atlas"
            className="w-full rounded-xl border border-white/10 bg-ink-800/80 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-atlas-400/60 focus:outline-none focus:ring-2 focus:ring-atlas-400/30"
          />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                type === t
                  ? "bg-atlas-500 text-ink-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-atlas-400/40 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        {query.trim() === "" && type === "All" ? (
          <p className="text-center text-slate-500">
            Start typing to search across {index.length} entries spanning gaming
            history.
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-slate-400">
            No results for{" "}
            <span className="text-white">&ldquo;{query}&rdquo;</span>. Try a
            different term.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-500">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <ul className="space-y-3">
              {results.map((r) => (
                <li key={r.id}>
                  <Link
                    href={r.href}
                    className="card-surface block p-5 hover:bg-ink-700/60"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-white">{r.title}</h3>
                      <span
                        className={`chip border ${typeStyles[r.type] ?? ""}`}
                      >
                        {r.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {r.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
