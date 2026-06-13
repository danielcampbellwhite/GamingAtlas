import Link from "next/link";
import type { Article } from "@/lib/types";

export default function FeaturedArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`card-surface group flex flex-col p-6 ${
        featured ? "md:p-8" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="chip border border-magenta-500/30 bg-magenta-500/10 text-magenta-400">
          {article.category}
        </span>
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span>· {article.readingTime} min read</span>
      </div>

      <h3
        className={`mt-3 font-semibold text-white transition group-hover:text-atlas-300 ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {article.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
        {article.excerpt}
      </p>

      <span className="mt-4 text-sm font-medium text-atlas-300 group-hover:text-atlas-200">
        Read article →
      </span>
    </Link>
  );
}
