/** Shared domain types for Gaming Atlas data. */

export type TimelineCategory =
  | "Consoles"
  | "Games"
  | "Companies"
  | "Technology"
  | "Esports";

export interface Console {
  id: string;
  name: string;
  manufacturer: string;
  generation: number;
  releaseYear: number;
  launchDate: string;
  discontinuedYear?: number;
  unitsSold?: string;
  decade: string;
  specs: Record<string, string>;
  significance: string;
  bestSellers?: string[];
}

export interface TimelineEvent {
  id: string;
  year: number;
  date?: string;
  title: string;
  category: TimelineCategory;
  decade: string;
  description: string;
  milestone?: boolean;
  impact?: string;
}

export interface GameRecord {
  id: string;
  category: string;
  title: string;
  holder: string;
  record: string;
  date: string;
  source: string;
  sourceUrl?: string;
  description: string;
}

export interface Legend {
  id: string;
  name: string;
  role: string;
  country: string;
  born?: number;
  company?: string;
  knownFor: string[];
  notableWorks: string[];
  bio: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  content: string;
}

export interface Game {
  id: string;
  title: string;
  year: number;
  decade: string;
  developer: string;
  publisher: string;
  platforms: string[];
  genre: string;
  series?: string;
  description: string;
  significance: string;
}

/** A normalized item used by the global search index. */
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: "Article" | "Timeline" | "Console" | "Record" | "Legend" | "Game";
  href: string;
  keywords: string;
}
