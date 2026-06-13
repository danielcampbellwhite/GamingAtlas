import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RecordCard from "@/components/RecordCard";
import { getRecordCategories, getRecords } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gaming World Records",
  description:
    "Gaming world records — fastest speedruns, highest game sales, longest gaming sessions, most copies sold, and highest esports earnings.",
  path: "/records",
  keywords: ["gaming world records", "video game records", "speedrun records"],
});

export default function RecordsPage() {
  const records = getRecords();
  const categories = getRecordCategories();

  return (
    <>
      <PageHeader
        eyebrow="World Records"
        title="Gaming World Records"
        description="Record-breaking sales, speedruns, endurance feats, and esports earnings from across gaming history."
      />
      <div className="container-atlas py-12">
        {categories.map((cat) => {
          const items = records.filter((r) => r.category === cat);
          return (
            <section key={cat} className="mb-14">
              <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-white">
                <span className="text-atlas-300">{cat}</span>
                <span className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <RecordCard key={r.id} record={r} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
