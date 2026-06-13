import type { TimelineEvent } from "@/lib/types";

const categoryStyles: Record<string, string> = {
  Consoles: "bg-atlas-500/15 text-atlas-200 border-atlas-400/30",
  Games: "bg-magenta-500/15 text-magenta-400 border-magenta-500/30",
  Companies: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Technology: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  Esports: "bg-violet-500/15 text-violet-300 border-violet-400/30",
};

export default function TimelineCard({ event }: { event: TimelineEvent }) {
  return (
    <article
      id={event.id}
      className="card-surface group relative p-6 scroll-mt-24 animate-fade-up"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-2xl font-bold text-white">
          {event.year}
        </span>
        <span
          className={`chip border ${categoryStyles[event.category] ?? ""}`}
        >
          {event.category}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {event.description}
      </p>
      {event.milestone && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs text-slate-300">
          <span aria-hidden className="text-atlas-300">
            ★
          </span>
          <span>
            <span className="font-semibold text-white">Milestone:</span>{" "}
            {event.impact}
          </span>
        </p>
      )}
    </article>
  );
}
