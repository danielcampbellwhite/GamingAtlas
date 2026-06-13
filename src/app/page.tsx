import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import ConsoleCard from "@/components/ConsoleCard";
import GameCard from "@/components/GameCard";
import RecordCard from "@/components/RecordCard";
import TimelineCard from "@/components/TimelineCard";
import TodayInHistory from "@/components/TodayInHistory";
import RandomFact from "@/components/RandomFact";
import JsonLd from "@/components/JsonLd";
import { decades } from "@/config/site";
import { websiteJsonLd } from "@/lib/seo";
import {
  getConsoles,
  getFeaturedArticles,
  getGames,
  getGamingFacts,
  getRecords,
  getTimeline,
} from "@/lib/data";

function SectionHeading({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-slate-400">{description}</p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="text-sm font-medium text-atlas-300 hover:text-atlas-200"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = getFeaturedArticles(3);
  const timeline = getTimeline();
  const popularConsoles = getConsoles()
    .filter((c) =>
      ["nes", "playstation-2", "wii", "switch"].includes(c.id),
    )
    .slice(0, 4);
  const latestRecords = getRecords().slice(0, 3);
  const famousGames = getGames()
    .filter((g) =>
      ["super-mario-bros", "doom", "minecraft", "ocarina-of-time", "tetris", "elden-ring"].includes(g.id),
    )
    .slice(0, 3);
  const timelinePreview = [...timeline]
    .filter((e) => e.milestone)
    .slice(-4)
    .reverse();

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HeroSection />

      {/* Today in history + random fact */}
      <section className="container-atlas py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <TodayInHistory events={timeline} />
          <RandomFact facts={getGamingFacts()} />
        </div>
      </section>

      {/* Featured articles */}
      <section className="container-atlas py-14">
        <SectionHeading
          title="Featured Articles"
          description="Deep dives into the people, machines, and moments that shaped gaming."
          href="/blog"
          linkLabel="All articles"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((a) => (
            <FeaturedArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Timeline preview */}
      <section className="border-y border-white/10 bg-ink-900/30 py-14">
        <div className="container-atlas">
          <SectionHeading
            title="Timeline Preview"
            description="A few of the milestones that changed the course of gaming history."
            href="/timeline"
            linkLabel="Full timeline"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timelinePreview.map((e) => (
              <TimelineCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular consoles */}
      <section className="container-atlas py-14">
        <SectionHeading
          title="Popular Consoles"
          description="The machines that defined their generations."
          href="/consoles"
          linkLabel="All consoles"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {popularConsoles.map((c) => (
            <ConsoleCard key={c.id} console={c} />
          ))}
        </div>
      </section>

      {/* Famous games */}
      <section className="container-atlas py-14">
        <SectionHeading
          title="Famous Games"
          description="Landmark titles that defined genres and generations."
          href="/games"
          linkLabel="All games"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {famousGames.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* Latest records */}
      <section className="border-y border-white/10 bg-ink-900/30 py-14">
        <div className="container-atlas">
          <SectionHeading
            title="Latest Records"
            description="Record-breaking achievements from across gaming."
            href="/records"
            linkLabel="All records"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {latestRecords.map((r) => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore by decade */}
      <section className="container-atlas py-14">
        <SectionHeading
          title="Explore by Decade"
          description="Travel through gaming history one era at a time."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {decades.map((d) => (
            <Link
              key={d}
              href={`/decade/${d}`}
              className="card-surface group flex flex-col items-center justify-center p-6 text-center"
            >
              <span className="font-display text-2xl font-bold text-white transition group-hover:text-atlas-300">
                {d}
              </span>
              <span className="mt-1 text-xs text-slate-500">Explore →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
