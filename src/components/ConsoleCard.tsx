import Link from "next/link";
import type { Console } from "@/lib/types";

export default function ConsoleCard({ console }: { console: Console }) {
  return (
    <article
      id={console.id}
      className="card-surface flex flex-col p-6 scroll-mt-24"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            <Link
              href={`/consoles/${console.id}`}
              className="transition hover:text-atlas-300"
            >
              {console.name}
            </Link>
          </h3>
          <p className="text-sm text-slate-400">{console.manufacturer}</p>
        </div>
        <span className="chip shrink-0">Gen {console.generation}</span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            Released
          </dt>
          <dd className="font-medium text-slate-200">{console.releaseYear}</dd>
        </div>
        {console.unitsSold && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">
              Units Sold
            </dt>
            <dd className="font-medium text-slate-200">{console.unitsSold}</dd>
          </div>
        )}
      </dl>

      <details className="group mt-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-atlas-300 hover:text-atlas-200">
          <span className="group-open:hidden">Show specifications ▾</span>
          <span className="hidden group-open:inline">Hide specifications ▴</span>
        </summary>
        <dl className="mt-3 space-y-2 rounded-lg bg-white/5 p-4 text-sm">
          {Object.entries(console.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4">
              <dt className="text-slate-500">{key}</dt>
              <dd className="text-right font-medium text-slate-200">{value}</dd>
            </div>
          ))}
        </dl>
      </details>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        {console.significance}
      </p>

      {console.bestSellers && console.bestSellers.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {console.bestSellers.map((game) => (
            <span key={game} className="chip">
              {game}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <p className="text-xs text-slate-500">
          {console.decade}
          {console.discontinuedYear
            ? ` · Discontinued ${console.discontinuedYear}`
            : " · In production"}
        </p>
        <Link
          href={`/consoles/${console.id}`}
          className="shrink-0 text-sm font-medium text-atlas-300 hover:text-atlas-200"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
