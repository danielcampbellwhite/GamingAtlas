import Link from "next/link";
import { decades, siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-atlas grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold text-white"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-atlas-400 to-magenta-500 text-ink-950"
            >
              ◆
            </span>
            Gaming<span className="gradient-text">Atlas</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            A digital museum of video game history — timelines, consoles,
            records, legends, and the milestones that shaped the medium.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-400 transition hover:text-atlas-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">By Decade</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {decades.map((d) => (
              <li key={d}>
                <Link
                  href={`/decade/${d}`}
                  className="text-slate-400 transition hover:text-atlas-300"
                >
                  The {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">About</h3>
          <p className="mt-4 text-sm text-slate-400">
            Gaming Atlas is a static, open educational project documenting the
            history of video games. Data is illustrative and curated for
            learning.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-atlas flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Built with Next.js &amp; hosted on
            GitHub Pages.
          </p>
          <p>Made for gaming history enthusiasts everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
