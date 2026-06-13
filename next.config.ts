import type { NextConfig } from "next";

/**
 * Gaming Atlas — Next.js configuration for GitHub Pages static hosting.
 *
 * The site is exported as fully static HTML/CSS/JS (`output: "export"`) so it
 * can be served by GitHub Pages with no server runtime.
 *
 * The site is served from a custom apex domain (https://gamingatlas.co.uk) at
 * the domain ROOT, so the base path is empty by default. To host it instead as
 * a GitHub Pages project site (https://<user>.github.io/GamingAtlas), set
 * NEXT_PUBLIC_BASE_PATH="/GamingAtlas".
 */
const isProd = process.env.NODE_ENV === "production";
void isProd;

// Custom domain serves from root → empty base path. Override via env var if you
// deploy to a project-site sub-path instead.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath;

const nextConfig: NextConfig = {
  output: "export",
  // Export every route as `route/index.html` so deep links work on GitHub Pages.
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
  },
  // Surface the resolved base path to the client (used for canonical/OG URLs).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
