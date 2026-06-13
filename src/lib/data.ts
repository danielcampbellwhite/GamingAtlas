/**
 * Data loading utilities.
 *
 * All site data lives in static JSON files under /data and is imported at build
 * time. These helpers provide typed, sorted access so pages and components don't
 * touch the raw JSON directly.
 */
import consolesData from "@/data/consoles.json";
import timelineData from "@/data/timeline.json";
import recordsData from "@/data/records.json";
import legendsData from "@/data/legends.json";
import articlesData from "@/data/articles.json";
import gamesData from "@/data/games.json";

import type {
  Article,
  Console,
  Game,
  GameRecord,
  Legend,
  SearchItem,
  TimelineEvent,
} from "./types";

/* --------------------------------- Consoles -------------------------------- */

export function getConsoles(): Console[] {
  return (consolesData as unknown as Console[])
    .slice()
    .sort((a, b) => a.releaseYear - b.releaseYear);
}

export function getConsoleById(id: string): Console | undefined {
  return (consolesData as unknown as Console[]).find((c) => c.id === id);
}

/* --------------------------------- Timeline -------------------------------- */

export function getTimeline(): TimelineEvent[] {
  return (timelineData as unknown as TimelineEvent[])
    .slice()
    .sort((a, b) => a.year - b.year);
}

export function getMilestones(): TimelineEvent[] {
  return getTimeline().filter((e) => e.milestone);
}

export function getTimelineByDecade(decade: string): TimelineEvent[] {
  return getTimeline().filter((e) => e.decade === decade);
}

export function getConsolesByDecade(decade: string): Console[] {
  return getConsoles().filter((c) => c.decade === decade);
}

/**
 * Events whose recorded date matches a given month/day ("Today in History").
 * Falls back to nothing if an event has no precise date.
 */
export function getEventsOnDate(month: number, day: number): TimelineEvent[] {
  return getTimeline().filter((e) => {
    if (!e.date) return false;
    const d = new Date(e.date);
    return d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
  });
}

/* ---------------------------------- Records -------------------------------- */

export function getRecords(): GameRecord[] {
  return recordsData as unknown as GameRecord[];
}

export function getRecordById(id: string): GameRecord | undefined {
  return getRecords().find((r) => r.id === id);
}

export function getRecordCategories(): string[] {
  return Array.from(new Set(getRecords().map((r) => r.category))).sort();
}

/* ---------------------------------- Legends -------------------------------- */

export function getLegends(): Legend[] {
  return legendsData as unknown as Legend[];
}

export function getLegendById(id: string): Legend | undefined {
  return (legendsData as unknown as Legend[]).find((l) => l.id === id);
}

/* --------------------------------- Articles -------------------------------- */

export function getArticles(): Article[] {
  return (articlesData as unknown as Article[])
    .slice()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return (articlesData as unknown as Article[]).find((a) => a.slug === slug);
}

export function getFeaturedArticles(count = 3): Article[] {
  return getArticles().slice(0, count);
}

/* ----------------------------------- Games --------------------------------- */

export function getGames(): Game[] {
  return (gamesData as unknown as Game[])
    .slice()
    .sort((a, b) => a.year - b.year);
}

export function getGameById(id: string): Game | undefined {
  return getGames().find((g) => g.id === id);
}

export function getGamesByDecade(decade: string): Game[] {
  return getGames().filter((g) => g.decade === decade);
}

export function getGameGenres(): string[] {
  return Array.from(new Set(getGames().map((g) => g.genre))).sort();
}

/** Games sharing a series or genre with the given game (for "related"). */
export function getRelatedGames(game: Game, count = 3): Game[] {
  return getGames()
    .filter(
      (g) =>
        g.id !== game.id &&
        (g.genre === game.genre ||
          (!!game.series && g.series === game.series)),
    )
    .slice(0, count);
}

/* ------------------------------ Random facts ------------------------------- */

/**
 * Pool of historical gaming facts, derived from timeline events plus a few
 * curated extras, used by the "Random Gaming Fact" widget.
 */
export function getGamingFacts(): string[] {
  const fromTimeline = getTimeline().map(
    (e) => `${e.year}: ${e.title} — ${e.description}`,
  );
  const extras = [
    "The highest-selling video game of all time is Minecraft, with over 300 million copies sold.",
    "The PlayStation 2 is the best-selling home console ever, moving more than 155 million units.",
    "Pac-Man's ghosts each have their own distinct AI personality and chase behavior.",
    "The 1983 video game crash saw the North American console market shrink by around 97%.",
    "The Nintendo Game Boy sold over 118 million units across its lifetime.",
    "'Easter eggs' in games are named after a hidden message in Atari's 1980 game Adventure.",
  ];
  return [...fromTimeline, ...extras];
}

/* ------------------------------ Search index ------------------------------- */

/**
 * Build a flat, normalized search index across all content types. Consumed by
 * the client-side global search.
 */
export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const a of getArticles()) {
    items.push({
      id: `article-${a.slug}`,
      title: a.title,
      description: a.excerpt,
      type: "Article",
      href: `/blog/${a.slug}`,
      keywords: `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.category}`,
    });
  }

  for (const e of getTimeline()) {
    items.push({
      id: `timeline-${e.id}`,
      title: `${e.year} — ${e.title}`,
      description: e.description,
      type: "Timeline",
      href: `/timeline#${e.id}`,
      keywords: `${e.title} ${e.description} ${e.category} ${e.year} ${e.decade}`,
    });
  }

  for (const c of getConsoles()) {
    items.push({
      id: `console-${c.id}`,
      title: c.name,
      description: `${c.manufacturer} · ${c.releaseYear} · Generation ${c.generation}`,
      type: "Console",
      href: `/consoles/${c.id}`,
      keywords: `${c.name} ${c.manufacturer} ${c.significance} ${c.decade}`,
    });
  }

  for (const r of getRecords()) {
    items.push({
      id: `record-${r.id}`,
      title: r.title,
      description: `${r.holder} — ${r.record}`,
      type: "Record",
      href: `/records/${r.id}`,
      keywords: `${r.title} ${r.holder} ${r.record} ${r.category} ${r.description}`,
    });
  }

  for (const l of getLegends()) {
    items.push({
      id: `legend-${l.id}`,
      title: l.name,
      description: `${l.role}${l.company ? ` · ${l.company}` : ""}`,
      type: "Legend",
      href: `/legends/${l.id}`,
      keywords: `${l.name} ${l.role} ${l.company ?? ""} ${l.knownFor.join(" ")} ${l.bio}`,
    });
  }

  for (const g of getGames()) {
    items.push({
      id: `game-${g.id}`,
      title: g.title,
      description: `${g.developer} · ${g.year} · ${g.genre}`,
      type: "Game",
      href: `/games/${g.id}`,
      keywords: `${g.title} ${g.developer} ${g.publisher} ${g.genre} ${g.series ?? ""} ${g.description} ${g.platforms.join(" ")}`,
    });
  }

  return items;
}
