import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import JsonLd from "@/components/JsonLd";
import { getArticleBySlug, getArticles } from "@/lib/data";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

/** Pre-render a static page for every article. */
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return buildMetadata({ title: "Article not found", description: "" });
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    keywords: article.tags,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getArticles()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          slug: article.slug,
          date: article.date,
          author: article.author,
        })}
      />

      <div className="border-b border-white/10 bg-ink-900/40">
        <div className="container-atlas py-12">
          <Link
            href="/blog"
            className="text-sm text-atlas-300 hover:text-atlas-200"
          >
            ← Back to all articles
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="chip border border-magenta-500/30 bg-magenta-500/10 text-magenta-400">
              {article.category}
            </span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>· {article.readingTime} min read</span>
            <span>· By {article.author}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {article.title}
          </h1>
        </div>
      </div>

      <article className="container-atlas py-12">
        <div className="prose-atlas mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="chip">
              #{tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-14 max-w-3xl border-t border-white/10 pt-8">
            <h2 className="mb-6 font-display text-xl font-bold text-white">
              Related articles
            </h2>
            <ul className="space-y-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="card-surface block p-5 hover:bg-ink-700/60"
                  >
                    <h3 className="font-semibold text-white">{a.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{a.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  );
}
