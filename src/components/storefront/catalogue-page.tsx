import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/storefront/product-card";
import { catalogueCategories, categoryLabel, pathCategory, type CatalogueProduct } from "@/lib/catalog";

export function CataloguePage({ products, initialCategory }: { products: CatalogueProduct[]; initialCategory?: string }) {
  const mappedCategory = initialCategory ? pathCategory[initialCategory] ?? initialCategory : "all";
  const [category, setCategory] = useState(mappedCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 24;
  const filtered = useMemo(() => products.filter((product) => {
    const haystack = `${product.name} ${product.model_number ?? ""} ${product.description ?? ""} ${product.subcategory ?? ""} ${product.features.join(" ")}`.toLowerCase();
    return (category === "all" || product.category === category) && (!inStock || product.in_stock) && haystack.includes(query.toLowerCase());
  }).sort((a, b) => sort === "price-low" ? (a.price ?? Infinity) - (b.price ?? Infinity) : sort === "price-high" ? (b.price ?? -1) - (a.price ?? -1) : a.name.localeCompare(b.name)), [products, category, inStock, query, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const chooseCategory = (value: string) => { setCategory(value); setPage(1); };
  return <>
    <section className="border-b border-border bg-muted/40"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><p className="text-xs font-semibold uppercase text-teal">Live product catalogue</p><h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Equipment for every part of the system</h1><p className="mt-4 max-w-2xl text-muted-foreground">Browse our complete live range. Search by product name, model, application or specification, then order directly through WhatsApp.</p></div></section>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-3 border-b border-border pb-6 lg:grid-cols-[1fr_220px_auto]">
        <label className="relative"><span className="sr-only">Search products</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search all products…" className="h-11 bg-card pl-10" /></label>
        <Select value={sort} onValueChange={setSort}><SelectTrigger className="h-11 bg-card"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="name">Name A–Z</SelectItem><SelectItem value="price-low">Price: low to high</SelectItem><SelectItem value="price-high">Price: high to low</SelectItem></SelectContent></Select>
        <Button variant={inStock ? "default" : "outline"} onClick={() => { setInStock((value) => !value); setPage(1); }} className="h-11 shadow-none"><SlidersHorizontal className="size-4" />In stock only</Button>
      </div>
      <div className="flex gap-2 overflow-x-auto py-5">{catalogueCategories.map((item) => <Button key={item.key} variant={category === item.key ? "default" : "outline"} onClick={() => chooseCategory(item.key)} className="shrink-0 shadow-none">{item.label}</Button>)}</div>
      <div className="mb-5 flex items-center justify-between gap-4"><p className="text-sm text-muted-foreground"><strong className="text-foreground">{filtered.length}</strong> {category === "all" ? "products" : categoryLabel(category).toLowerCase()}</p><p className="text-xs text-muted-foreground">Page {currentPage} of {pages}</p></div>
      {visible.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="border border-dashed border-border py-16 text-center"><h2 className="font-serif text-xl font-bold">No matching products</h2><Button variant="link" onClick={() => { setQuery(""); chooseCategory("all"); }}>Clear filters</Button></div>}
      {pages > 1 && <nav aria-label="Catalogue pages" className="mt-10 flex justify-center gap-3"><Button variant="outline" disabled={currentPage === 1} onClick={() => { setPage((value) => Math.max(1, value - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Previous</Button><Button variant="outline" disabled={currentPage === pages} onClick={() => { setPage((value) => Math.min(pages, value + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Next</Button></nav>}
    </section>
  </>;
}
