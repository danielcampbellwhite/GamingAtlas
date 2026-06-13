/**
 * Global site configuration. Update `url` if you deploy to a custom domain.
 */
export const siteConfig = {
  name: "Gaming Atlas",
  tagline: "Explore the History of Video Games",
  description:
    "Gaming Atlas is an interactive digital museum of video game history — explore gaming timelines, console generations, world records, gaming legends, and industry milestones.",
  // Production URL of the deployed site (used for canonical, OG, sitemap).
  url: "https://gamingatlas.co.uk",
  // Resolved at build time from next.config.ts (e.g. "/gamingatlas" or "").
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  author: "Gaming Atlas",
  twitter: "@gamingatlas",
  keywords: [
    "gaming history",
    "video game history",
    "gaming timeline",
    "console generations",
    "gaming world records",
    "history of gaming",
  ],
  nav: [
    { label: "Timeline", href: "/timeline" },
    { label: "Consoles", href: "/consoles" },
    { label: "World Records", href: "/records" },
    { label: "Legends", href: "/legends" },
    { label: "Milestones", href: "/milestones" },
    { label: "Blog", href: "/blog" },
    { label: "Search", href: "/search" },
  ],
} as const;

export const decades = [
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s",
] as const;

export type Decade = (typeof decades)[number];

/**
 * Prefix an internal asset path (e.g. an image in /public) with the configured
 * base path so it resolves correctly on GitHub Pages project sites.
 * (next/link and next/image handle basePath automatically — this is for raw
 * URLs such as those embedded in metadata or JSON-LD.)
 */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.basePath}${normalized}`;
}

/** Absolute URL for canonical tags, Open Graph, sitemap, structured data. */
export function absoluteUrl(path = ""): string {
  const normalized = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";
  return `${siteConfig.url}${normalized}`;
}
