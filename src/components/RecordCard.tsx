import type { GameRecord } from "@/lib/types";

export default function RecordCard({ record }: { record: GameRecord }) {
  return (
    <article id={record.id} className="card-surface p-6 scroll-mt-24">
      <div className="flex items-center justify-between gap-3">
        <span className="chip border border-atlas-400/30 bg-atlas-500/15 text-atlas-200">
          {record.category}
        </span>
        <time className="text-xs text-slate-500">
          {new Date(record.date).getFullYear()}
        </time>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-white">{record.title}</h3>

      <p className="mt-3 font-display text-2xl font-bold gradient-text">
        {record.record}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-300">{record.holder}</p>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {record.description}
      </p>

      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-500">
        Source:{" "}
        {record.sourceUrl ? (
          <a
            href={record.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-atlas-300 hover:text-atlas-200"
          >
            {record.source}
          </a>
        ) : (
          record.source
        )}
      </p>
    </article>
  );
}
