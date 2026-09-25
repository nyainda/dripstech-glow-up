import { ExternalLink, MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import type { LiveItem } from "@/lib/content-api";
import { whatsappLink } from "@/lib/site";

export function LiveContent({ heading, items, orderable = false }: { heading: string; items: LiveItem[]; orderable?: boolean }) {
  if (items.length === 0) return null;
  return <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
    <h2 className="font-serif text-3xl font-bold">{heading}</h2>
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => <article key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
        {item.image && <img src={item.image} alt={item.title} loading="lazy" width={640} height={400} className="aspect-[16/10] w-full bg-muted object-cover" />}
        <div className="flex flex-1 flex-col p-5">
          {item.meta.length > 0 && <p className="text-[11px] font-semibold uppercase text-teal">{item.meta.join(" · ")}</p>}
          <h3 className="mt-2 font-serif text-lg font-bold leading-snug">{item.title}</h3>
          {item.text && <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>}
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 text-sm font-semibold">
            {item.price !== null && <span className="text-lg">{formatPrice(item.price)}</span>}
            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal">{item.linkLabel}<ExternalLink className="size-3.5" /></a>}
            {orderable && <a href={whatsappLink(`Hello DripTech, I'm interested in the ${item.title}${item.price !== null ? ` (${formatPrice(item.price)})` : ""}. Please confirm availability and delivery.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-teal"><MessageCircle className="size-4" />Enquire on WhatsApp</a>}
          </div>
        </div>
      </article>)}
    </div>
  </section>;
}
