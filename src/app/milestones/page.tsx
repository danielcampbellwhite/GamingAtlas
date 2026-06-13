import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getMilestones } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industry Milestones",
  description:
    "The major historical events and industry milestones that shaped gaming — from the Atari crash to the launches of PlayStation, Xbox, Steam, and the Nintendo Switch.",
  path: "/milestones",
  keywords: ["gaming milestones", "video game industry history", "gaming events"],
});

export default function MilestonesPage() {
  const milestones = getMilestones();

  return (
    <>
      <PageHeader
        eyebrow="Industry Milestones"
        title="Moments That Changed Gaming"
        description="The pivotal events that redirected the entire industry — presented as a chronological vertical timeline."
      />
      <div className="container-atlas py-12">
        <ol className="relative mx-auto max-w-3xl border-l border-white/10">
          {milestones.map((m) => (
            <li key={m.id} className="mb-10 ml-6">
              <span
                aria-hidden
                className="absolute -left-3 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-atlas-400 to-magenta-500 text-xs text-ink-950 shadow-glow"
              >
                ★
              </span>
              <div className="card-surface p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-2xl font-bold text-white">
                    {m.year}
                  </span>
                  <span className="chip">{m.category}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  {m.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {m.description}
                </p>
                {m.impact && (
                  <p className="mt-4 rounded-lg bg-white/5 p-3 text-sm text-slate-300">
                    <span className="font-semibold text-atlas-300">
                      Why it mattered:
                    </span>{" "}
                    {m.impact}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
