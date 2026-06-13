import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ConsoleCard from "@/components/ConsoleCard";
import { getConsoles } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Console History & Generations",
  description:
    "Explore the history of video game consoles across every generation — launch dates, manufacturers, specifications, and historical significance.",
  path: "/consoles",
  keywords: ["console generations", "console history", "video game consoles"],
});

export default function ConsolesPage() {
  const consoles = getConsoles();

  // Group consoles by generation for a museum-like layout.
  const byGeneration = consoles.reduce<Record<number, typeof consoles>>(
    (acc, c) => {
      (acc[c.generation] ??= []).push(c);
      return acc;
    },
    {},
  );
  const generations = Object.keys(byGeneration)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <>
      <PageHeader
        eyebrow="Console History"
        title="Every Generation of Consoles"
        description="From the Magnavox Odyssey to the PlayStation 5 and Xbox Series X — the hardware that powered gaming history."
      />
      <div className="container-atlas py-12">
        {generations.map((gen) => (
          <section key={gen} className="mb-14">
            <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-white">
              <span className="text-atlas-300">Generation {gen}</span>
              <span className="h-px flex-1 bg-white/10" />
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {byGeneration[gen]!.map((c) => (
                <ConsoleCard key={c.id} console={c} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
