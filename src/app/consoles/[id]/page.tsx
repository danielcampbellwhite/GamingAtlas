import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ConsoleCard from "@/components/ConsoleCard";
import { getConsoleById, getConsoles } from "@/lib/data";
import { absoluteUrl } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getConsoles().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const console = getConsoleById(id);
  if (!console) return buildMetadata({ title: "Console not found", description: "" });
  return buildMetadata({
    title: `${console.name} (${console.releaseYear})`,
    description: `${console.name} by ${console.manufacturer}, released ${console.releaseYear}. ${console.significance}`,
    path: `/consoles/${console.id}`,
    keywords: [console.name, console.manufacturer, "console history", "console generations"],
  });
}

export default async function ConsoleDetailPage({ params }: Params) {
  const { id } = await params;
  const console = getConsoleById(id);
  if (!console) notFound();

  const related = getConsoles()
    .filter(
      (c) =>
        c.id !== console.id &&
        (c.manufacturer === console.manufacturer ||
          c.generation === console.generation),
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: console.name,
          category: "Video game console",
          brand: { "@type": "Brand", name: console.manufacturer },
          releaseDate: String(console.releaseYear),
          description: console.significance,
          url: absoluteUrl(`/consoles/${console.id}`),
        }}
      />

      <div className="border-b border-white/10 bg-ink-900/40">
        <div className="container-atlas py-12">
          <Link href="/consoles" className="text-sm text-atlas-300 hover:text-atlas-200">
            ← All consoles
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="chip">{console.manufacturer}</span>
            <span className="chip">Generation {console.generation}</span>
            <span className="chip">{console.decade}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {console.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-400">
            Released {console.releaseYear}
            {console.discontinuedYear
              ? ` · Discontinued ${console.discontinuedYear}`
              : " · Still in production"}
            {console.unitsSold ? ` · ${console.unitsSold} units sold` : ""}
          </p>
        </div>
      </div>

      <div className="container-atlas grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold text-white">
            Historical significance
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            {console.significance}
          </p>

          {console.bestSellers && console.bestSellers.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl font-bold text-white">
                Best-selling games
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {console.bestSellers.map((game) => (
                  <span key={game} className="chip">
                    {game}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside>
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-bold text-white">
              Specifications
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Launch date</dt>
                <dd className="text-right font-medium text-slate-200">
                  {new Date(console.launchDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </dd>
              </div>
              {Object.entries(console.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4">
                  <dt className="text-slate-500">{key}</dt>
                  <dd className="text-right font-medium text-slate-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container-atlas pb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            Related consoles
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <ConsoleCard key={c.id} console={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
