import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import TimelineCard from "@/components/TimelineCard";
import ConsoleCard from "@/components/ConsoleCard";
import GameCard from "@/components/GameCard";
import { decades } from "@/config/site";
import {
  getConsolesByDecade,
  getGamesByDecade,
  getTimelineByDecade,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ decade: string }>;
}

const decadeBlurbs: Record<string, string> = {
  "1970s": "The birth of the industry — arcades, Pong, and the first home consoles.",
  "1980s": "Boom, crash, and revival — from Pac-Man to the NES rescuing the market.",
  "1990s": "The 16-bit and 32-bit wars, the leap to 3D, and the rise of the PlayStation.",
  "2000s": "Online gaming goes mainstream — Xbox Live, Steam, and the best-selling consoles ever.",
  "2010s": "Streaming, indie booms, mobile gaming, and the hybrid Nintendo Switch.",
  "2020s": "Next-gen power — SSD streaming, ray tracing, and record-breaking releases.",
};

export function generateStaticParams() {
  return decades.map((decade) => ({ decade }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { decade } = await params;
  if (!decades.includes(decade as (typeof decades)[number])) {
    return buildMetadata({ title: "Decade not found", description: "" });
  }
  return buildMetadata({
    title: `Gaming in the ${decade}`,
    description: `Explore video game history from the ${decade} — the key events, consoles, and milestones of the era. ${decadeBlurbs[decade] ?? ""}`,
    path: `/decade/${decade}`,
    keywords: [`${decade} gaming`, `${decade} video games`, "gaming history"],
  });
}

export default async function DecadePage({ params }: Params) {
  const { decade } = await params;
  if (!decades.includes(decade as (typeof decades)[number])) notFound();

  const events = getTimelineByDecade(decade);
  const consoles = getConsolesByDecade(decade);
  const games = getGamesByDecade(decade);

  return (
    <>
      <PageHeader
        eyebrow="Explore by Decade"
        title={`Gaming in the ${decade}`}
        description={decadeBlurbs[decade]}
      />

      <div className="container-atlas py-8">
        <nav className="flex flex-wrap gap-2" aria-label="Decades">
          {decades.map((d) => (
            <Link
              key={d}
              href={`/decade/${d}`}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                d === decade
                  ? "bg-atlas-500 text-ink-950"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-atlas-400/40 hover:text-white"
              }`}
            >
              {d}
            </Link>
          ))}
        </nav>
      </div>

      <section className="container-atlas py-8">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">
          Key Events
        </h2>
        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <TimelineCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No recorded events for this decade yet.</p>
        )}
      </section>

      {consoles.length > 0 && (
        <section className="container-atlas py-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            Consoles of the {decade}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {consoles.map((c) => (
              <ConsoleCard key={c.id} console={c} />
            ))}
          </div>
        </section>
      )}

      {games.length > 0 && (
        <section className="container-atlas py-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            Games of the {decade}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
