# 🎮 Gaming Atlas

> An interactive digital museum of video game history — timelines, console
> generations, world records, gaming legends, and the milestones that shaped the
> medium.

Gaming Atlas is a **production-ready static website** built with **Next.js (App
Router, static export)**, **TypeScript**, and **Tailwind CSS**. It is designed to
be hosted entirely on **GitHub Pages** with no server required.

---

## ✨ Features

- **Home** — hero, "Today in Gaming History", random gaming fact, featured
  articles, timeline preview, popular consoles, latest records, explore by decade.
- **Interactive Timeline** — filter by category, full-text search, and sort.
- **Console History** — every generation from the Magnavox Odyssey to the
  PlayStation 5 and Xbox Series X, with specs and historical significance.
- **World Records** — sales, speedruns, endurance, and esports records.
- **Gaming Legends** — profile cards for developers, designers, pioneers, and
  esports players.
- **Industry Milestones** — a vertical timeline of pivotal moments.
- **Blog** — Markdown-powered articles with related-post suggestions.
- **Global Search** — client-side search across all content types.
- **Explore by Decade** — dedicated pages for the 1970s–2020s.
- **SEO** — dynamic metadata, Open Graph, Twitter cards, JSON-LD structured
  data, canonical URLs, `sitemap.xml`, and `robots.txt`.
- **Performance** — fully static, mobile-first, responsive, dark-mode design
  built for Lighthouse scores above 90.

---

## 🧱 Tech Stack

| Concern         | Choice                                    |
| --------------- | ----------------------------------------- |
| Framework       | Next.js 14 (App Router, `output: export`) |
| Language        | TypeScript                                |
| Styling         | Tailwind CSS                              |
| Content         | JSON data files + Markdown articles       |
| Markdown        | `react-markdown` + `remark-gfm`           |
| Hosting         | GitHub Pages (via GitHub Actions)         |

---

## 📁 Folder Structure

```
GamingAtlas/
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
├── data/                          # All site content (JSON)
│   ├── consoles.json
│   ├── timeline.json
│   ├── records.json
│   ├── legends.json
│   └── articles.json
├── public/
│   └── .nojekyll                  # Stops GitHub Pages from stripping _next/
├── src/
│   ├── app/                       # App Router pages
│   │   ├── layout.tsx             # Root layout (nav, footer, metadata)
│   │   ├── page.tsx               # Home
│   │   ├── globals.css            # Tailwind + design tokens
│   │   ├── sitemap.ts             # sitemap.xml
│   │   ├── robots.ts              # robots.txt
│   │   ├── not-found.tsx          # 404
│   │   ├── timeline/
│   │   ├── consoles/
│   │   ├── records/
│   │   ├── legends/
│   │   ├── milestones/
│   │   ├── blog/ + blog/[slug]/
│   │   ├── search/
│   │   └── decade/[decade]/
│   ├── components/                # Reusable UI components
│   ├── config/site.ts             # Site-wide config (name, nav, URL, base path)
│   └── lib/                       # data.ts, types.ts, seo.ts
├── next.config.ts                 # Static export + GitHub Pages config
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Run Locally

**Prerequisites:** Node.js 18.18+ (Node 20 recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# 3. Build the static site (outputs to ./out)
npm run build

# 4. Preview the production build locally
npm run serve   # serves ./out at http://localhost:3000
```

> In development the site runs at the root (`/`). In production it is built with
> a base path of `/GamingAtlas` (see configuration below).

---

## 🌐 Deploy to GitHub Pages

Deployment is fully automated via **GitHub Actions** (`.github/workflows/deploy.yml`).

### One-time setup

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to the `main` branch (or run the workflow manually from the **Actions**
   tab via *Run workflow*).

The workflow will:

1. Install dependencies (`npm ci`)
2. Build the static export (`npm run build` → `./out`)
3. Add a `.nojekyll` file
4. Upload and deploy to GitHub Pages

Your site will be live at:

```
https://<your-username>.github.io/GamingAtlas/
```

### Base path configuration

GitHub Pages **project sites** are served from a sub-path
(`/<repo-name>/`), so the app sets `basePath: "/GamingAtlas"` in production.

`next.config.ts` reads the `NEXT_PUBLIC_BASE_PATH` environment variable, so you
can override it:

| Deployment target                             | `NEXT_PUBLIC_BASE_PATH` |
| --------------------------------------------- | ----------------------- |
| `username.github.io/GamingAtlas` (project)    | `/GamingAtlas` (default)|
| Custom domain or `username.github.io` (root)  | `""` (empty)            |

If your repository has a **different name**, update the default in
`next.config.ts` and the `url` in `src/config/site.ts` accordingly.

#### Custom domain

1. Add a `CNAME` file to `public/` containing your domain.
2. Set `NEXT_PUBLIC_BASE_PATH=""` in the workflow's build step.
3. Update `url` in `src/config/site.ts` to your domain.

---

## ✍️ Editing Content

All content lives in `/data` as JSON — no code changes needed to add entries:

- **`consoles.json`** — console name, manufacturer, generation, specs, etc.
- **`timeline.json`** — historical events (set `"milestone": true` to feature an
  event on the Milestones page).
- **`records.json`** — world records.
- **`legends.json`** — legend profiles.
- **`articles.json`** — blog posts. The `content` field is **Markdown** and
  supports headings, lists, bold/italic, links, and GitHub-flavored Markdown.

New entries automatically appear on their pages, in the global search index, and
in the sitemap.

---

## 📜 Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server                 |
| `npm run build` | Build the static site to `./out`             |
| `npm run serve` | Serve the built `./out` directory locally    |
| `npm run lint`  | Run ESLint                                    |

---

## 📄 License

This project is provided for educational purposes. Historical data is curated and
illustrative. Game, console, and company names are trademarks of their respective
owners.
