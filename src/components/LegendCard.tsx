import type { Legend } from "@/lib/types";

/** Derive up to two initials for the avatar monogram. */
function initials(name: string): string {
  return name
    .split(" ")
    .filter((p) => /[A-Za-z]/.test(p[0] ?? ""))
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export default function LegendCard({ legend }: { legend: Legend }) {
  return (
    <article id={legend.id} className="card-surface p-6 scroll-mt-24">
      <div className="flex items-center gap-4">
        <div
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-atlas-400/30 to-magenta-500/30 font-display text-xl font-bold text-white ring-1 ring-white/10"
        >
          {initials(legend.name)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{legend.name}</h3>
          <p className="text-sm text-atlas-300">{legend.role}</p>
          <p className="text-xs text-slate-500">
            {legend.country}
            {legend.born ? ` · b. ${legend.born}` : ""}
            {legend.company ? ` · ${legend.company}` : ""}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">{legend.bio}</p>

      <div className="mt-4">
        <h4 className="text-xs uppercase tracking-wide text-slate-500">
          Known for
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {legend.knownFor.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <h4 className="text-xs uppercase tracking-wide text-slate-500">
          Notable works
        </h4>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          {legend.notableWorks.map((work) => (
            <li key={work} className="flex gap-2">
              <span aria-hidden className="text-atlas-400">
                ▹
              </span>
              {work}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
