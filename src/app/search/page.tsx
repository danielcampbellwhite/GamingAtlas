import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import SearchClient from "@/components/SearchClient";
import { getSearchIndex } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description:
    "Search across Gaming Atlas — articles, timeline events, consoles, world records, and gaming legends.",
  path: "/search",
  keywords: ["search gaming history", "gaming archive search"],
});

export default function SearchPage() {
  const index = getSearchIndex();

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Search Gaming Atlas"
        description="Find articles, timeline events, consoles, records, and legends — all from one place."
      />
      <section className="container-atlas py-12">
        {/* useSearchParams requires a Suspense boundary during static export. */}
        <Suspense
          fallback={
            <p className="text-center text-slate-500">Loading search…</p>
          }
        >
          <SearchClient index={index} />
        </Suspense>
      </section>
    </>
  );
}
