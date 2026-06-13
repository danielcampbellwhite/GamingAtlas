import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecordCard from "@/components/RecordCard";
import { getRecordById, getRecords } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getRecords().map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const record = getRecordById(id);
  if (!record) return buildMetadata({ title: "Record not found", description: "" });
  return buildMetadata({
    title: record.title,
    description: `${record.title}: ${record.record} held by ${record.holder}. ${record.description}`,
    path: `/records/${record.id}`,
    keywords: [record.title, record.category, "gaming world records", "video game records"],
  });
}

export default async function RecordDetailPage({ params }: Params) {
  const { id } = await params;
  const record = getRecordById(id);
  if (!record) notFound();

  const related = getRecords()
    .filter((r) => r.id !== record.id && r.category === record.category)
    .slice(0, 3);

  return (
    <>
      <div className="border-b border-white/10 bg-ink-900/40">
        <div className="container-atlas py-12">
          <Link href="/records" className="text-sm text-atlas-300 hover:text-atlas-200">
            ← All records
          </Link>
          <span className="mt-4 block">
            <span className="chip border border-atlas-400/30 bg-atlas-500/15 text-atlas-200">
              {record.category}
            </span>
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {record.title}
          </h1>
          <p className="mt-4 font-display text-3xl font-bold gradient-text">
            {record.record}
          </p>
          <p className="mt-1 text-lg text-slate-300">{record.holder}</p>
        </div>
      </div>

      <div className="container-atlas py-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-white">About this record</h2>
          <p className="mt-3 leading-relaxed text-slate-300">{record.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="card-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Date recorded
              </dt>
              <dd className="mt-1 font-medium text-slate-200">
                {new Date(record.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </dd>
            </div>
            <div className="card-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Source</dt>
              <dd className="mt-1 font-medium text-slate-200">
                {record.sourceUrl ? (
                  <a
                    href={record.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-atlas-300 hover:text-atlas-200"
                  >
                    {record.source}
                  </a>
                ) : (
                  record.source
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-atlas pb-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            More {record.category.toLowerCase()} records
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
