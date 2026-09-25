import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArticlePage } from "@/components/article-page";
import { fetchArticle } from "@/lib/content-api";
import { absoluteUrl, pageHead, SITE } from "@/lib/site";

export const Route = createFileRoute("/news_/$slug")({
  loader: async ({ params }) => { const article = await fetchArticle("news", params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData: a, params }) => {
    if (!a) return { meta: [{ title: "Article unavailable | DripTech" }, { name: "robots", content: "noindex" }] };
    const base = pageHead(`/news/${params.slug}`, `${a.title} | DripTech News`, a.description, "article");
    return { ...base, meta: [...base.meta, ...(a.image ? [{ property: "og:image", content: a.image }, { name: "twitter:image", content: a.image }] : []), ...(a.published ? [{ property: "article:published_time", content: a.published }] : [])],
      scripts: [...((base as { scripts?: unknown[] }).scripts ?? []) as never[], { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "NewsArticle", headline: a.title, description: a.description, image: a.image ?? undefined, datePublished: a.published ?? undefined, dateModified: a.modified ?? a.published ?? undefined, mainEntityOfPage: absoluteUrl(`/news/${params.slug}`), publisher: { "@type": "Organization", name: SITE.name } }) }] };
  },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="font-serif text-3xl font-bold">Article not found</h1><Link to="/news" className="mt-4 inline-block font-semibold text-teal">Back to news</Link></div>,
  component: Page,
});
function Page() { return <ArticlePage article={Route.useLoaderData()} kind="news" />; }
