import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

interface PageSeoOptions {
  title: string;
  description: string;
  /** Path without the base path, e.g. "/timeline". */
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * Build a complete Metadata object (title, description, canonical, Open Graph,
 * Twitter card) for a page. Used by every route's `generateMetadata` / metadata
 * export to keep SEO consistent.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
  type = "website",
  publishedTime,
}: PageSeoOptions): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle =
    path === "" ? `${siteConfig.name} — ${siteConfig.tagline}` : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.twitter,
    },
  };
}

/** JSON-LD for the site as a whole (used on the homepage). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** JSON-LD describing a blog article. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    author: { "@type": "Organization", name: opts.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: absoluteUrl(`/blog/${opts.slug}`),
  };
}

/** JSON-LD person profile for a gaming legend. */
export function personJsonLd(opts: {
  name: string;
  role: string;
  bio: string;
  id: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.role,
    description: opts.bio,
    url: absoluteUrl(`/legends#${opts.id}`),
  };
}
