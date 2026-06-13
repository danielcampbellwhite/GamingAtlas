import Link from "next/link";
import type { Game } from "@/lib/types";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.id}`}
      id={game.id}
      className="card-surface group flex flex-col p-6 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="chip border border-magenta-500/30 bg-magenta-500/10 text-magenta-400">
          {game.genre}
        </span>
        <span className="font-display text-xl font-bold text-white">
          {game.year}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-white transition group-hover:text-atlas-300">
        {game.title}
      </h3>
      <p className="text-sm text-slate-400">{game.developer}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {game.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {game.platforms.slice(0, 3).map((p) => (
          <span key={p} className="chip">
            {p}
          </span>
        ))}
      </div>

      <span className="mt-4 text-sm font-medium text-atlas-300 group-hover:text-atlas-200">
        View details →
      </span>
    </Link>
  );
}
