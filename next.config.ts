import type { NextConfig } from "next";

/**
 * Gaming Atlas — Next.js configuration for GitHub Pages static hosting.
 *
 * The site is exported as fully static HTML/CSS/JS (`output: "export"`) so it
 * can be served by GitHub Pages with no server runtime.
 *
 * `basePath` / `assetPrefix` default to the project-site path
 * (https://<user>.github.io/gamingatlas) but can be overridden with the
 * NEXT_PUBLIC_BASE_PATH env var (e.g. set it to "" when deploying to a custom
 * domain or a user/organization page served from the domain root).
 */
const isProd = process.env.NODE_ENV === "production";

// Allow the workflow / custom domains to override the base path.
const rawBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/gamingatlas" : "");
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
