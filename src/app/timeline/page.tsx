import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TimelineExplorer from "@/components/TimelineExplorer";
import { getTimeline } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Interactive Gaming Timeline",
  description:
    "An interactive timeline of video game history — filter, search, and sort key events across consoles, games, companies, technology, and esports.",
  path: "/timeline",
  keywords: ["gaming timeline", "video game history timeline", "gaming events"],
});

export default function TimelinePage() {
  const events = getTimeline();

  return (
    <>
      <PageHeader
        eyebrow="Interactive Timeline"
        title="The History of Video Games"
        description="Filter by category, search for events, and sort chronologically through decades of gaming history."
      />
      <section className="container-atlas py-12">
        <TimelineExplorer events={events} />
      </section>
    </>
  );
}
