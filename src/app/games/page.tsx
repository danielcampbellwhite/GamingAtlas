import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GamesExplorer from "@/components/GamesExplorer";
import { getGameGenres, getGames } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Famous Games",
  description:
    "An archive of the most important and famous video games ever made — from Pong and Pac-Man to Minecraft and Elden Ring. Browse by genre, developer, and era.",
  path: "/games",
  keywords: ["famous games", "important video games", "video game archive", "best games ever"],
});

export default function GamesPage() {
  const games = getGames();
  const genres = getGameGenres();

  return (
    <>
      <PageHeader
        eyebrow="Famous Games"
        title="The Games That Shaped History"
        description="A curated archive of landmark titles — search and filter by genre, developer, and era."
      />
      <section className="container-atlas py-12">
        <GamesExplorer games={games} genres={genres} />
      </section>
    </>
  );
}
