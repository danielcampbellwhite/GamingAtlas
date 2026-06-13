import type { MetadataRoute } from "next";
import { absoluteUrl, decades } from "@/config/site";
import {
  getArticles,
  getConsoles,
  getGames,
  getLegends,
  getRecords,
} from "@/lib/data";

/**
 * Static sitemap generated at build time. Includes every top-level route, all
 * decade pages, every blog article, and every detail page (consoles, games,
 * legends, records).
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/timeline",
    "/consoles",
    "/games",
    "/records",
    "/legends",
    "/milestones",
    "/blog",
    "/quiz",
    "/search",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const decadeRoutes = decades.map((d) => ({
    url: absoluteUrl(`/decade/${d}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const articleRoutes = getArticles().map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const detailRoutes = [
    ...getConsoles().map((c) => `/consoles/${c.id}`),
    ...getGames().map((g) => `/games/${g.id}`),
    ...getLegends().map((l) => `/legends/${l.id}`),
    ...getRecords().map((r) => `/records/${r.id}`),
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...decadeRoutes, ...articleRoutes, ...detailRoutes];
}
