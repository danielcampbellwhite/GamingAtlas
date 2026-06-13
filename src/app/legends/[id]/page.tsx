import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import LegendCard from "@/components/LegendCard";
import { getLegendById, getLegends } from "@/lib/data";
import { buildMetadata, personJsonLd } from "@/lib/seo";

interface Params {
  params: Promise<{ id: string }>;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter((p) => /[A-Za-z]/.test(p[0] ?? ""))
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function generateStaticParams() {
  return getLegends().map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const legend = getLegendById(id);
  if (!legend) return buildMetadata({ title: "Legend not found", description: "" });
  return buildMetadata({
    title: legend.name,
    description: `${legend.name} — ${legend.role}. ${legend.bio}`,
    path: `/legends/${legend.id}`,
    keywords: [legend.name, legend.role, "gaming legends", ...legend.knownFor],
    type: "article",
  });
}

export default async function LegendDetailPage({ params }: Params) {
  const { id } = await params;
  const legend = getLegendById(id);
  if (!legend) notFound();

  const related = getLegends().filter((l) => l.id !== legend.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={personJsonLd({
          name: legend.name,
          role: legend.role,
          bio: legend.bio,
          id: legend.id,
        })}
      />

      <div className="border-b border-white/10 bg-ink-900/40">
        <div className="container-atlas py-12">
          <Link href="/legends" className="text-sm text-atlas-300 hover:text-atlas-200">
            ← All legends
          </Link>
          <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div
              aria-hidden
              className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-atlas-400/30 to-magenta-500/30 font-display text-2xl font-bold text-white ring-1 ring-white/10"
            >
              {initials(legend.name)}
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {legend.name}
              </h1>
              <p className="mt-2 text-lg text-atlas-300">{legend.role}</p>
              <p className="text-sm text-slate-500">
                {legend.country}
                {legend.born ? ` · b. ${legend.born}` : ""}
                {legend.company ? ` · ${legend.company}` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-atlas grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold text-white">Biography</h2>
          <p className="mt-3 leading-relaxed text-slate-300">{legend.bio}</p>

          <div className="mt-8">
            <h2 className="font-display text-2xl font-bold text-white">
              Notable works
            </h2>
            <ul className="mt-3 space-y-2 text-slate-300">
              {legend.notableWorks.map((work) => (
                <li key={work} className="flex gap-2">
                  <span aria-hidden className="text-atlas-400">
                    ▹
                  </span>
                  {work}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-bold text-white">Known for</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {legend.knownFor.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container-atlas pb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            More gaming legends
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((l) => (
              <LegendCard key={l.id} legend={l} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
