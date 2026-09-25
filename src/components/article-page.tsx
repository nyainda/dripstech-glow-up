import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import type { Article } from "@/lib/content-api";
import { whatsappLink } from "@/lib/site";

export function ArticlePage({ article, kind }: { article: Article; kind: "blog" | "news" }) {
  const back = kind === "blog" ? "/blog" : "/news";
  return <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <Link to={back} className="inline-flex items-center gap-1 text-sm font-semibold text-teal"><ArrowLeft className="size-4" />Back to {kind === "blog" ? "blog" : "news"}</Link>
    {article.meta.length > 0 && <p className="mt-6 text-xs font-semibold uppercase text-teal">{article.meta.join(" · ")}</p>}
    <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
    {article.image && <img src={article.image} alt={article.title} width={1200} height={675} className="mt-8 aspect-video w-full rounded-lg bg-muted object-cover" />}
    <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: article.html }} />
    {article.tags.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{article.tags.map((t) => <span key={t} className="rounded border border-border px-2 py-1 text-xs text-muted-foreground">{t}</span>)}</div>}
    <div className="mt-12 rounded-lg border border-border bg-card p-6">
      <h2 className="font-serif text-xl font-bold">Planning an irrigation project?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Talk to our team for advice, a quote, or product availability.</p>
      <a href={whatsappLink(`Hello DripTech, I just read "${article.title}" and would like some advice.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><MessageCircle className="size-4" />Chat on WhatsApp</a>
    </div>
  </article>;
}
