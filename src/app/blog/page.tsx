import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import { getArticles } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gaming History Blog",
  description:
    "Articles and deep dives on gaming history — console launches, the history of Nintendo, the evolution of first-person shooters, the rise of esports, and more.",
  path: "/blog",
  keywords: ["gaming blog", "gaming history articles", "video game articles"],
});

export default function BlogPage() {
  const articles = getArticles();
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Gaming History, In Depth"
        description="Long-form articles exploring the stories behind the games, consoles, and people that shaped the medium."
      />
      <div className="container-atlas py-12">
        {lead && (
          <div className="mb-10">
            <FeaturedArticleCard article={lead} featured />
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <FeaturedArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </>
  );
}
