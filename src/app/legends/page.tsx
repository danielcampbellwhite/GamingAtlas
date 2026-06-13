import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LegendCard from "@/components/LegendCard";
import JsonLd from "@/components/JsonLd";
import { getLegends } from "@/lib/data";
import { buildMetadata, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gaming Legends",
  description:
    "Profiles of gaming legends — the developers, designers, industry pioneers, and esports players who shaped video game history.",
  path: "/legends",
  keywords: ["gaming legends", "game developers", "gaming pioneers"],
});

export default function LegendsPage() {
  const legends = getLegends();

  return (
    <>
      {legends.map((l) => (
        <JsonLd
          key={l.id}
          data={personJsonLd({
            name: l.name,
            role: l.role,
            bio: l.bio,
            id: l.id,
          })}
        />
      ))}
      <PageHeader
        eyebrow="Gaming Legends"
        title="The People Behind the Games"
        description="Developers, designers, pioneers, and competitors whose work defined the medium."
      />
      <div className="container-atlas py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {legends.map((l) => (
            <LegendCard key={l.id} legend={l} />
          ))}
        </div>
      </div>
    </>
  );
}
