import type { MetadataRoute } from "next";
import { absoluteUrl, decades } from "@/config/site";
import { getArticles } from "@/lib/data";

/**
 * Static sitemap generated at build time. Includes every top-level route, all
 * decade pages, and every blog article.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/timeline",
    "/consoles",
    "/records",
    "/legends",
    "/milestones",
    "/blog",
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

  return [...staticRoutes, ...decadeRoutes, ...articleRoutes];
}
