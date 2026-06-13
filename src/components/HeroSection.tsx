import Link from "next/link";
import SearchBar from "./SearchBar";
import { siteConfig } from "@/config/site";

const features = [
  "Interactive timeline",
  "Console generations",
  "World records",
  "Gaming legends",
  "Industry milestones",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Decorative grid + glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="container-atlas py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="chip animate-fade-up">
            <span aria-hidden className="mr-2 text-atlas-300">
              ◆
            </span>
            A digital museum of video game history
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-up">
            Gaming <span className="gradient-text">Atlas</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 sm:text-xl animate-fade-up">
            {siteConfig.tagline}
          </p>

          <div className="mx-auto mt-8 max-w-xl animate-fade-up">
            <SearchBar placeholder="Search consoles, games, records, legends…" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <Link href="/timeline" className="btn-primary">
              Explore the timeline
            </Link>
            <Link href="/consoles" className="btn-ghost">
              Browse consoles
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden className="text-atlas-400">
                  ✦
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
