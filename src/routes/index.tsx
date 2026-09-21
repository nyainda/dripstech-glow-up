import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Menu, MessageCircle, Phone, Search, ShoppingBag, Truck, X } from "lucide-react";
import { useMemo, useState } from "react";

import heroImage from "@/assets/driptech-field-hero.jpg";
import driplineImage from "@/assets/product-dripline.jpg";
import filterImage from "@/assets/product-filter.jpg";
import fittingsImage from "@/assets/product-fittings.jpg";
import pumpImage from "@/assets/product-pump.jpg";

export const Route = createFileRoute("/")({
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

const products = [
  { name: "16mm Drip Line · 100m", category: "Drip Lines", specs: "2.0 L/h emitters · 30cm spacing", note: "Per roll", badge: "In stock", image: driplineImage, alt: "Coil of black 16mm drip irrigation line" },
  { name: "0.75 HP Submersible Pump", category: "Pumps", specs: "220V · stainless steel body", note: "12-month warranty", badge: "Best seller", image: pumpImage, alt: "Stainless steel submersible irrigation pump" },
  { name: "Disc Filter · 1 inch", category: "Filters", specs: "120 mesh · serviceable body", note: "Per unit", badge: "In stock", image: filterImage, alt: "Black one-inch irrigation disc filter" },
  { name: "16mm Fitting Set", category: "Fittings", specs: "Tees, elbows, joiners and end caps", note: "Ask for quantity pricing", badge: "Popular", image: fittingsImage, alt: "Assorted 16mm drip irrigation fittings" },
];

const categories = ["All", "Drip Lines", "Pumps", "Filters", "Fittings"];
const whatsappBase = "https://wa.me/254723407849?text=";

function whatsappLink(message: string) {
  return `${whatsappBase}${encodeURIComponent(message)}`;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const shownProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    const queryMatch = `${product.name} ${product.category} ${product.specs}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [activeCategory, query]);

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
              {categories.slice(1).map((category) => <a key={category} href="#catalogue" onClick={() => setActiveCategory(category)} className="border-b border-transparent py-1 hover:border-gold">{category}</a>)}
              <a href="#sizing" className="border-b border-transparent py-1 hover:border-gold">Installation</a>
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen((open) => !open)} className="grid size-10 place-items-center rounded-md border border-ink/15 hover:bg-ink/5" aria-label="Search products"><Search className="size-4" /></button>
              <a href={whatsappLink("Hello DripTech, I need help choosing an irrigation system.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-md bg-gold px-3 py-2.5 text-sm font-semibold sm:inline-flex"><MessageCircle className="size-4" />Sizing help</a>
              <button onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-md border border-ink/15 lg:hidden" aria-label="Toggle menu">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
            </div>
          </div>
          {searchOpen && <div className="border-t border-ink/10 py-3"><label className="relative block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/50" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search driplines, pumps, filters…" className="h-11 w-full rounded-md border border-ink/20 bg-surface pl-10 pr-3 text-sm outline-none focus:border-teal" /></label></div>}
          {menuOpen && <nav className="grid border-t border-ink/10 py-3 lg:hidden">{categories.slice(1).map((category) => <a key={category} href="#catalogue" onClick={() => { setActiveCategory(category); setMenuOpen(false); }} className="py-3 text-sm font-medium">{category}</a>)}<a href="#sizing" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium">Installation & sizing</a></nav>}
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
          {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category ? "bg-ink text-paper" : "border border-ink/15 bg-paper hover:border-teal"}`}>{category}</button>)}
        </div>
      </section>

      <section id="catalogue" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 text-xs font-semibold uppercase text-teal">Product counter</p><h2 className="font-serif text-3xl font-bold">Equipment customers ask for most</h2><p className="mt-2 max-w-[54ch] text-sm text-ink/60">Start with the specifications, then ask us to confirm current price and availability.</p></div>
          <a href={whatsappLink("Hello DripTech, please share your current full product catalogue.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">Request full catalogue <ArrowRight className="size-4" /></a>
        </div>
        {shownProducts.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{shownProducts.map((product) => <article key={product.name} className="group flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-surface">
          <div className="relative overflow-hidden bg-paper"><img src={product.image} alt={product.alt} width={816} height={816} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute left-2 top-2 rounded-full bg-ink/90 px-2 py-1 text-[10px] font-semibold uppercase text-paper">{product.badge}</span></div>
          <div className="flex flex-1 flex-col p-4"><p className="text-[11px] font-semibold uppercase text-teal">{product.category}</p><h3 className="mt-1 font-serif text-base font-bold leading-snug">{product.name}</h3><p className="mt-2 text-xs leading-5 text-ink/60">{product.specs}</p><div className="mt-auto pt-5"><p className="mb-3 text-xs font-medium text-ink/50">{product.note}</p><a href={whatsappLink(`Hello DripTech, I'm interested in ${product.name}. Please confirm the current price and availability.`)} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-md bg-ink py-2.5 text-sm font-semibold text-paper hover:bg-teal"><MessageCircle className="size-4" />Ask price & availability</a></div></div>
        </article>)}</div> : <div className="border border-dashed border-ink/20 py-12 text-center"><p className="font-serif text-xl font-bold">No matching equipment</p><button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="mt-3 text-sm font-semibold text-teal">Clear search</button></div>}
      </section>

      <section id="sizing" className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="rounded-lg bg-ink p-7 text-paper lg:col-span-5 lg:p-8"><p className="text-xs font-semibold uppercase text-gold">Buying guide</p><h2 className="mt-3 font-serif text-2xl font-bold">Not sure what fits your farm?</h2><p className="mt-3 text-sm leading-6 text-paper/70">Send your acreage, crop and water source. Our team will help size the driplines, pump, filter and fittings before you order.</p><a href={whatsappLink("Hello DripTech. My farm size is: ___. My crop is: ___. My water source is: ___. Please help me size the system.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink">Start a sizing request <ArrowRight className="size-4" /></a></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          <div className="rounded-lg border border-ink/10 bg-surface p-6"><Truck className="size-5 text-teal" /><p className="mt-5 text-[11px] font-semibold uppercase text-ink/45">Delivery</p><h3 className="mt-2 font-serif text-lg font-bold">Plan your delivery</h3><p className="mt-2 text-sm leading-6 text-ink/60">Confirm stock, destination and dispatch timing with our team before payment.</p></div>
          <div className="rounded-lg border border-ink/10 bg-surface p-6"><ShoppingBag className="size-5 text-teal" /><p className="mt-5 text-[11px] font-semibold uppercase text-ink/45">Installation</p><h3 className="mt-2 font-serif text-lg font-bold">From parts list to field</h3><p className="mt-2 text-sm leading-6 text-ink/60">Get help with system design, installation planning and the fittings needed to complete the job.</p></div>
        </div>
      </section>

      <footer className="bg-ink text-paper/70"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><div><p className="font-serif text-lg font-bold text-paper">DripTech Eco Flow</p><p className="mt-1 text-sm">Practical irrigation equipment for Kenya.</p></div><div className="flex flex-wrap gap-3"><a href="tel:+254723407849" className="inline-flex items-center gap-2 rounded-md border border-paper/20 px-3 py-2 text-sm text-paper"><Phone className="size-4" />0723 407 849</a><a href={whatsappLink("Hello DripTech, I would like to make an enquiry.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-ink"><MessageCircle className="size-4" />WhatsApp</a></div></div><p className="mt-8 border-t border-paper/10 pt-6 text-xs text-paper/45">© 2026 DripTech Eco Flow · Kenya</p></div></footer>
    </main>
  );
}
