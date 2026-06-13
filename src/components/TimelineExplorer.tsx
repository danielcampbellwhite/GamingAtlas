"use client";

import { useMemo, useState } from "react";
import type { TimelineCategory, TimelineEvent } from "@/lib/types";
import TimelineCard from "./TimelineCard";

const categories: (TimelineCategory | "All")[] = [
  "All",
  "Consoles",
  "Games",
  "Companies",
  "Technology",
  "Esports",
];

type SortKey = "year-asc" | "year-desc";

/**
 * Interactive timeline with client-side filtering (by category), free-text
 * search, and sorting. Operates entirely on data passed from the server so the
 * page stays fully static.
 */
export default function TimelineExplorer({
  events,
}: {
  events: TimelineEvent[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<SortKey>("year-asc");
  const [milestonesOnly, setMilestonesOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = events.filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (milestonesOnly && !e.milestone) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        String(e.year).includes(q) ||
        e.decade.toLowerCase().includes(q)
      );
    });
    result.sort((a, b) =>
      sort === "year-asc" ? a.year - b.year : b.year - a.year,
    );
    return result;
  }, [events, query, category, sort, milestonesOnly]);

  return (
    <div>
      {/* Controls */}
      <div className="card-surface mb-8 flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, years, or keywords…"
            aria-label="Search timeline"
            className="w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-atlas-400/60 focus:outline-none focus:ring-2 focus:ring-atlas-400/30 lg:max-w-sm"
          />
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg border border-white/10 bg-ink-900 px-3 py-2 text-sm text-white focus:border-atlas-400/60 focus:outline-none"
              >
                <option value="year-asc">Oldest first</option>
                <option value="year-desc">Newest first</option>
              </select>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={milestonesOnly}
                onChange={(e) => setMilestonesOnly(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-ink-900 text-atlas-500 focus:ring-atlas-400/30"
              />
              Milestones only
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "bg-atlas-500 text-ink-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-atlas-400/40 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-500">
        Showing <span className="text-slate-300">{filtered.length}</span> of{" "}
        {events.length} events
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <TimelineCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
          No events match your filters. Try broadening your search.
        </p>
      )}
    </div>
  );
}
