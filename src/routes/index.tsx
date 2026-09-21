import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronDown, Menu, MessageCircle, Phone, Search, ShoppingBag, Truck, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { categoryLabel, catalogueCategories, formatPrice, getFeaturedCatalogue, type CatalogueProduct } from "@/lib/catalog";
import heroImage from "@/assets/driptech-field-hero.jpg";
import driplineImage from "@/assets/product-dripline.jpg";
import filterImage from "@/assets/product-filter.jpg";
import fittingsImage from "@/assets/product-fittings.jpg";
import pumpImage from "@/assets/product-pump.jpg";

const catalogueQuery = queryOptions({
  queryKey: ["featured-catalogue"],
  queryFn: getFeaturedCatalogue,
  staleTime: 1000 * 60 * 10,
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogueQuery),
  head: () => ({
    meta: [
      { title: "Drip Irrigation Kits, Pumps & Fittings Kenya | DripTech" },
      { name: "description", content: "Shop drip irrigation kits, driplines, pumps, filters and fittings in Kenya. Get practical sizing advice, clear specifications and nationwide delivery." },
      { property: "og:title", content: "Drip Irrigation Equipment in Kenya | DripTech" },
      { property: "og:description", content: "Irrigation equipment with clear specifications, expert sizing help and delivery across Kenya." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        name: "DripTech Eco Flow",
        url: "https://www.dripstech.co.ke/",
        telephone: "+254723407849",
        areaServed: "Kenya",
        priceRange: "KES",
        description: "Drip irrigation equipment, pumps, fittings and installation support for Kenyan farms.",
      }),
    }],
  }),
  component: Index,
});

const fallbackProducts: CatalogueProduct[] = [
  { id: "dripline", name: "16mm Drip Line · 100m", category: "drip_irrigation", subcategory: "Driplines", description: "2.0 L/h emitters with 30cm spacing.", price: null, images: [driplineImage], in_stock: true, featured: true, model_number: null, features: [], applications: [] },
  { id: "pump", name: "0.75 HP Submersible Pump", category: "pumps_motors", subcategory: "Submersible pumps", description: "220V pump with stainless steel body.", price: null, images: [pumpImage], in_stock: true, featured: true, model_number: null, features: [], applications: [] },
  { id: "filter", name: "Disc Filter · 1 inch", category: "filtration_systems", subcategory: "Disc filters", description: "120 mesh filter with a serviceable body.", price: null, images: [filterImage], in_stock: true, featured: true, model_number: null, features: [], applications: [] },
  { id: "fittings", name: "16mm Fitting Set", category: "pipes_fittings", subcategory: "Drip fittings", description: "Tees, elbows, joiners and end caps.", price: null, images: [fittingsImage], in_stock: true, featured: true, model_number: null, features: [], applications: [] },
];

const whatsappBase = "https://wa.me/254723407849?text=";

function whatsappLink(message: string) {
  return `${whatsappBase}${encodeURIComponent(message)}`;
}

function Index() {
  const { data: liveProducts } = useSuspenseQuery(catalogueQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);

  const products = liveProducts.length > 0 ? liveProducts : fallbackProducts;

  const shownProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = activeCategory === "all" || product.category === activeCategory;
    const queryMatch = `${product.name} ${product.category} ${product.subcategory ?? ""} ${product.description ?? ""}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [activeCategory, products, query]);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="bg-ink text-paper/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] sm:px-6 lg:px-8">
          <p className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gold" />Nationwide delivery across Kenya</p>
          <div className="hidden items-center gap-5 sm:flex"><span>M-Pesa & bank transfer</span><a href="tel:+254723407849" className="text-paper">0723 407 849</a></div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-2.5" aria-label="DripTech home">
              <span className="grid size-9 place-items-center rounded-md bg-ink font-serif text-lg font-bold text-paper">D</span>
              <span className="font-serif text-lg font-bold sm:text-xl">DripTech <span className="text-teal">Eco Flow</span></span>
            </a>
            <nav className="hidden items-center gap-7 text-sm font-medium lg:flex" aria-label="Main navigation">
              {catalogueCategories.slice(1).map((category) => <a key={category.key} href="#catalogue" onClick={() => setActiveCategory(category.key)} className="border-b border-transparent py-1 hover:border-gold">{category.label}</a>)}
              <a href="#sizing" className="border-b border-transparent py-1 hover:border-gold">Installation</a>
            </nav>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="icon" onClick={() => setSearchOpen((open) => !open)} className="size-10 border-ink/15 bg-transparent shadow-none hover:bg-ink/5" aria-label="Search products"><Search className="size-4" /></Button>
              <a href={whatsappLink("Hello DripTech, I need help choosing an irrigation system.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-md bg-gold px-3 py-2.5 text-sm font-semibold sm:inline-flex"><MessageCircle className="size-4" />Sizing help</a>
               <Button variant="outline" size="icon" onClick={() => setMenuOpen((open) => !open)} className="size-10 border-ink/15 bg-transparent shadow-none lg:hidden" aria-label="Toggle menu">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
            </div>
          </div>
           {searchOpen && <div className="border-t border-ink/10 py-3"><label className="relative block"><span className="sr-only">Search products</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/50" /><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search driplines, pumps, filters…" className="h-11 border-ink/20 bg-surface pl-10 shadow-none focus-visible:ring-teal" /></label></div>}
           {menuOpen && <nav className="grid border-t border-ink/10 py-3 lg:hidden">{catalogueCategories.slice(1).map((category) => <a key={category.key} href="#catalogue" onClick={() => { setActiveCategory(category.key); setMenuOpen(false); }} className="py-3 text-sm font-medium">{category.label}</a>)}<a href="#sizing" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium">Installation & sizing</a></nav>}
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        <div className="rise-in lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs font-semibold uppercase text-teal"><span className="size-1.5 rounded-full bg-gold" />Equipment for Kenyan farms</p>
          <h1 className="max-w-[19ch] text-balance font-serif text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">Irrigation that fits your farm—not the other way round.</h1>
          <p className="mt-5 max-w-[48ch] text-base leading-7 text-ink/70 sm:text-lg">Driplines, pumps, filters and complete systems with clear specifications, practical sizing support and delivery across Kenya.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalogue" className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper">Browse equipment <ArrowRight className="size-4" /></a>
            <a href={whatsappLink("Hello DripTech, please help me size an irrigation system for my farm.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-teal/30 bg-teal/10 px-5 py-3 text-sm font-semibold text-teal"><MessageCircle className="size-4" />WhatsApp sizing help</a>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-ink/65 sm:grid-cols-3">
            {["Parts and complete systems", "Technical sizing support", "Delivery across Kenya"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-teal" />{item}</span>)}
          </div>
        </div>
        <div className="rise-in-late lg:col-span-5">
          <div className="relative pb-5 pl-3 sm:pl-6">
            <img src={heroImage} alt="Drip-irrigated vegetable farm with visible drip lines" width={1024} height={1280} fetchPriority="high" className="aspect-[4/5] w-full rounded-lg object-cover" />
            <div className="absolute bottom-0 left-0 max-w-[230px] rounded-md border border-ink/10 bg-paper/95 px-4 py-3 shadow-lg">
              <p className="text-[10px] font-semibold uppercase text-teal">Need a complete system?</p>
              <p className="mt-1 font-serif text-base font-bold">Tell us your acreage and crop.</p>
              <p className="mt-1 text-xs text-ink/60">We’ll prepare the right parts list.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink/[0.03]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <span className="mr-3 hidden shrink-0 self-center text-xs font-semibold uppercase text-ink/45 sm:block">Shop by</span>
           {catalogueCategories.map((category) => <Button key={category.key} variant={activeCategory === category.key ? "default" : "outline"} onClick={() => setActiveCategory(category.key)} className={`shrink-0 shadow-none ${activeCategory === category.key ? "bg-ink text-paper" : "border-ink/15 bg-paper hover:border-teal"}`}>{category.label}</Button>)}
        </div>
      </section>

      <section id="catalogue" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
           <div><p className="mb-2 text-xs font-semibold uppercase text-teal">Live catalogue</p><h2 className="font-serif text-3xl font-bold">Choose with confidence</h2><p className="mt-2 max-w-[54ch] text-sm text-ink/60">Real products, current listed prices and stock status—ready to discuss on WhatsApp.</p></div>
          <a href={whatsappLink("Hello DripTech, please share your current full product catalogue.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">Request full catalogue <ArrowRight className="size-4" /></a>
        </div>
         {shownProducts.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{shownProducts.map((product) => <article key={product.id} className="group flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-surface">
           <button type="button" onClick={() => setSelectedProduct(product)} className="relative overflow-hidden bg-paper text-left" aria-label={`View ${product.name}`}><img src={product.images[0] ?? fittingsImage} alt={product.name} width={816} height={816} loading="lazy" className="aspect-square w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute left-2 top-2 rounded-full bg-ink/90 px-2 py-1 text-[10px] font-semibold uppercase text-paper">{product.in_stock ? "In stock" : "Check availability"}</span></button>
           <div className="flex flex-1 flex-col p-4"><p className="text-[11px] font-semibold uppercase text-teal">{categoryLabel(product.category)}</p><h3 className="mt-1 font-serif text-base font-bold leading-snug">{product.name}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/60">{product.description ?? product.subcategory ?? "Professional irrigation equipment."}</p><div className="mt-auto pt-5"><p className="mb-3 text-lg font-bold text-ink">{formatPrice(product.price)}</p><div className="grid grid-cols-[auto_1fr] gap-2"><Button variant="outline" size="icon" onClick={() => setSelectedProduct(product)} className="border-ink/20 bg-transparent shadow-none" aria-label={`View details for ${product.name}`}><ChevronDown className="size-4" /></Button><Button asChild className="bg-ink text-paper shadow-none hover:bg-teal"><a href={whatsappLink(`Hello DripTech, I'm interested in ${product.name}${product.price === null ? "" : ` listed at ${formatPrice(product.price)}`}. Please confirm availability and delivery.`)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Enquire on WhatsApp</a></Button></div></div></div>
         </article>)}</div> : <div className="border border-dashed border-ink/20 py-12 text-center"><p className="font-serif text-xl font-bold">No matching equipment</p><Button variant="link" onClick={() => { setQuery(""); setActiveCategory("all"); }} className="mt-3 text-teal">Clear search</Button></div>}
      </section>

      <section id="sizing" className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="rounded-lg bg-ink p-7 text-paper lg:col-span-5 lg:p-8"><p className="text-xs font-semibold uppercase text-gold">Buying guide</p><h2 className="mt-3 font-serif text-2xl font-bold">Not sure what fits your farm?</h2><p className="mt-3 text-sm leading-6 text-paper/70">Send your acreage, crop and water source. Our team will help size the driplines, pump, filter and fittings before you order.</p><a href={whatsappLink("Hello DripTech. My farm size is: ___. My crop is: ___. My water source is: ___. Please help me size the system.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink">Start a sizing request <ArrowRight className="size-4" /></a></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          <div className="rounded-lg border border-ink/10 bg-surface p-6"><Truck className="size-5 text-teal" /><p className="mt-5 text-[11px] font-semibold uppercase text-ink/45">Delivery</p><h3 className="mt-2 font-serif text-lg font-bold">Plan your delivery</h3><p className="mt-2 text-sm leading-6 text-ink/60">Confirm stock, destination and dispatch timing with our team before payment.</p></div>
          <div className="rounded-lg border border-ink/10 bg-surface p-6"><ShoppingBag className="size-5 text-teal" /><p className="mt-5 text-[11px] font-semibold uppercase text-ink/45">Installation</p><h3 className="mt-2 font-serif text-lg font-bold">From parts list to field</h3><p className="mt-2 text-sm leading-6 text-ink/60">Get help with system design, installation planning and the fittings needed to complete the job.</p></div>
        </div>
      </section>

       <footer className="bg-ink text-paper/70"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><div><p className="font-serif text-lg font-bold text-paper">DripTech Eco Flow</p><p className="mt-1 text-sm">Practical irrigation equipment for Kenya.</p></div><div className="flex flex-wrap gap-3"><a href="tel:+254723407849" className="inline-flex items-center gap-2 rounded-md border border-paper/20 px-3 py-2 text-sm text-paper"><Phone className="size-4" />0723 407 849</a><a href={whatsappLink("Hello DripTech, I would like to make an enquiry.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-ink"><MessageCircle className="size-4" />WhatsApp</a></div></div><p className="mt-8 border-t border-paper/10 pt-6 text-xs text-paper/45">© 2026 DripTech Eco Flow · Kenya</p></div></footer>

      <Dialog open={selectedProduct !== null} onOpenChange={(open) => { if (!open) setSelectedProduct(null); }}>
        {selectedProduct && <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-ink/15 bg-paper p-0 sm:rounded-lg">
          <div className="grid md:grid-cols-2">
            <div className="bg-surface p-6"><img src={selectedProduct.images[0] ?? fittingsImage} alt={selectedProduct.name} className="aspect-square w-full object-contain" /></div>
            <div className="flex flex-col p-6 sm:p-8">
              <DialogHeader><p className="text-left text-xs font-semibold uppercase text-teal">{categoryLabel(selectedProduct.category)}</p><DialogTitle className="text-left font-serif text-2xl leading-tight">{selectedProduct.name}</DialogTitle><DialogDescription className="text-left leading-6 text-ink/65">{selectedProduct.description ?? "Professional irrigation equipment for dependable field use."}</DialogDescription></DialogHeader>
              <div className="mt-6 border-y border-ink/10 py-5"><p className="text-2xl font-bold">{formatPrice(selectedProduct.price)}</p><p className="mt-1 flex items-center gap-2 text-sm text-teal"><Check className="size-4" />Available to order</p></div>
              {(selectedProduct.features.length > 0 || selectedProduct.applications.length > 0) && <div className="mt-5 space-y-2 text-sm text-ink/70">{[...selectedProduct.features, ...selectedProduct.applications].slice(0, 4).map((item) => <p key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal" />{item}</p>)}</div>}
              <Button asChild size="lg" className="mt-7 h-12 bg-gold text-ink shadow-none hover:bg-gold/90"><a href={whatsappLink(`Hello DripTech, I want to order ${selectedProduct.name}${selectedProduct.price === null ? "" : ` listed at ${formatPrice(selectedProduct.price)}`}. Please confirm stock and delivery to my location.`)} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />Order via WhatsApp</a></Button>
            </div>
          </div>
        </DialogContent>}
      </Dialog>
    </main>
  );
}
