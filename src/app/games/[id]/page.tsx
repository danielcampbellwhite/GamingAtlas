import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import GameCard from "@/components/GameCard";
import { getGameById, getGames, getRelatedGames } from "@/lib/data";
import { absoluteUrl } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getGames().map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const game = getGameById(id);
  if (!game) return buildMetadata({ title: "Game not found", description: "" });
  return buildMetadata({
    title: `${game.title} (${game.year})`,
    description: `${game.title} — a ${game.genre} game by ${game.developer}, released ${game.year}. ${game.significance}`,
    path: `/games/${game.id}`,
    keywords: [game.title, game.genre, game.developer, "famous games", "video game history"],
    type: "article",
  });
}

export default async function GameDetailPage({ params }: Params) {
  const { id } = await params;
  const game = getGameById(id);
  if (!game) notFound();

  const related = getRelatedGames(game, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: game.title,
          genre: game.genre,
          gamePlatform: game.platforms,
          datePublished: String(game.year),
          publisher: { "@type": "Organization", name: game.publisher },
          author: { "@type": "Organization", name: game.developer },
          description: game.description,
          url: absoluteUrl(`/games/${game.id}`),
        }}
      />

      <div className="border-b border-white/10 bg-ink-900/40">
        <div className="container-atlas py-12">
          <Link href="/games" className="text-sm text-atlas-300 hover:text-atlas-200">
            ← All games
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="chip border border-magenta-500/30 bg-magenta-500/10 text-magenta-400">
              {game.genre}
            </span>
            <span className="chip">{game.year}</span>
            <span className="chip">{game.decade}</span>
            {game.series && <span className="chip">{game.series} series</span>}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {game.title}
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            {game.developer}
            {game.publisher !== game.developer ? ` · Published by ${game.publisher}` : ""}
          </p>
        </div>
      </div>

      <div className="container-atlas grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold text-white">Overview</h2>
          <p className="mt-3 leading-relaxed text-slate-300">{game.description}</p>

          <h2 className="mt-8 font-display text-2xl font-bold text-white">
            Why it matters
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">{game.significance}</p>
        </div>

        <aside>
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-bold text-white">Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Released</dt>
                <dd className="font-medium text-slate-200">{game.year}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Developer</dt>
                <dd className="text-right font-medium text-slate-200">
                  {game.developer}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Publisher</dt>
                <dd className="text-right font-medium text-slate-200">
                  {game.publisher}
                </dd>
              </div>
            </dl>
            <h3 className="mt-5 text-xs uppercase tracking-wide text-slate-500">
              Platforms
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {game.platforms.map((p) => (
                <span key={p} className="chip">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container-atlas pb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            Related games
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
