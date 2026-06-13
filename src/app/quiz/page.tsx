import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuizClient, { type QuizItem } from "@/components/QuizClient";
import { getConsoles, getGames, getTimeline } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gaming History Quiz",
  description:
    "Test your knowledge of video game history with the Gaming Atlas 'Guess the Year' quiz — games, consoles, and historic events.",
  path: "/quiz",
  keywords: ["gaming quiz", "video game trivia", "gaming history quiz", "guess the year"],
});

export default function QuizPage() {
  // Assemble a pool of "what year?" prompts from across the archive.
  const items: QuizItem[] = [
    ...getTimeline().map((e) => ({
      prompt: e.title,
      year: e.year,
      category: e.category,
    })),
    ...getConsoles().map((c) => ({
      prompt: `${c.name} was released`,
      year: c.releaseYear,
      category: "Consoles",
    })),
    ...getGames().map((g) => ({
      prompt: `${g.title} was released`,
      year: g.year,
      category: "Games",
    })),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Interactive"
        title="Gaming History Quiz"
        description="How well do you know your gaming history? Guess the year for each game, console, and event."
      />
      <section className="container-atlas py-12">
        <QuizClient items={items} />
      </section>
    </>
  );
}
