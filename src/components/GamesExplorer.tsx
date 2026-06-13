"use client";

import { useMemo, useState } from "react";
import type { Game } from "@/lib/types";
import GameCard from "./GameCard";

type SortKey = "year-asc" | "year-desc" | "title";

export default function GamesExplorer({
  games,
  genres,
}: {
  games: Game[];
  genres: string[];
}) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("year-asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = games.filter((g) => {
      if (genre !== "All" && g.genre !== genre) return false;
      if (!q) return true;
      return (
        g.title.toLowerCase().includes(q) ||
        g.developer.toLowerCase().includes(q) ||
        g.publisher.toLowerCase().includes(q) ||
        (g.series ?? "").toLowerCase().includes(q) ||
        String(g.year).includes(q)
      );
    });
    result.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      return sort === "year-asc" ? a.year - b.year : b.year - a.year;
    });
    return result;
  }, [games, query, genre, sort]);

  return (
    <div>
      <div className="card-surface mb-8 flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, developers, series…"
            aria-label="Search games"
            className="w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-atlas-400/60 focus:outline-none focus:ring-2 focus:ring-atlas-400/30 lg:max-w-sm"
          />
          <label className="flex items-center gap-2 text-sm text-slate-400">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-white/10 bg-ink-900 px-3 py-2 text-sm text-white focus:border-atlas-400/60 focus:outline-none"
            >
              <option value="year-asc">Oldest first</option>
              <option value="year-desc">Newest first</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", ...genres].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenre(g)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                genre === g
                  ? "bg-atlas-500 text-ink-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-atlas-400/40 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-500">
        Showing <span className="text-slate-300">{filtered.length}</span> of{" "}
        {games.length} games
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
          No games match your filters. Try broadening your search.
        </p>
      )}
    </div>
  );
}
