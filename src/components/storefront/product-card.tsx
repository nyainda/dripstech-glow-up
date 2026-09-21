import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryLabel, categoryPath, formatPrice, productSlug, type CatalogueProduct } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";
import fallbackImage from "@/assets/product-fittings.jpg";

export function ProductCard({ product }: { product: CatalogueProduct }) {
  const category = categoryPath[product.category] ?? "all";
  const slug = productSlug(product);
  return <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card">
    <Link to="/products/$category/$product" params={{ category, product: slug }} className="relative overflow-hidden bg-background" aria-label={`View ${product.name}`}>
      <img src={product.images[0] ?? fallbackImage} alt={product.name} width={816} height={816} loading="lazy" className="aspect-square w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className="absolute left-2 top-2 rounded-full bg-brand-dark px-2 py-1 text-[10px] font-semibold uppercase text-brand-light">{product.in_stock ? "In stock" : "Check availability"}</span>
    </Link>
    <div className="flex flex-1 flex-col p-4"><p className="text-[11px] font-semibold uppercase text-teal">{categoryLabel(product.category)}</p><h2 className="mt-1 font-serif text-base font-bold leading-snug"><Link to="/products/$category/$product" params={{ category, product: slug }}>{product.name}</Link></h2><p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{product.description ?? product.subcategory ?? "Professional irrigation equipment."}</p><div className="mt-auto pt-5"><p className="mb-3 text-lg font-bold">{formatPrice(product.price)}</p><Button asChild className="w-full bg-primary text-primary-foreground shadow-none hover:bg-teal"><a href={whatsappLink(`Hello DripTech, I'm interested in ${product.name}${product.price === null ? "" : ` listed at ${formatPrice(product.price)}`}. Please confirm availability and delivery.`)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Enquire on WhatsApp</a></Button></div></div>
  </article>;
}
