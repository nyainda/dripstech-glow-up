import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE, whatsappLink } from "@/lib/site";

const links = [
  { to: "/products", label: "Products" },
  { to: "/irrigation-advisor", label: "Advisor" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/installation-guides", label: "Guides" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <>
    <a href="#main-content" className="sr-only z-[100] bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to main content</a>
    <div className="bg-brand-dark text-brand-light"><div className="mx-auto flex max-w-7xl justify-between px-4 py-2 text-[11px] sm:px-6 lg:px-8"><span>Nationwide delivery across Kenya</span><span className="hidden sm:inline">M-Pesa & bank transfer · {SITE.phoneDisplay}</span></div></div>
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="DripTech home"><span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary font-serif text-lg font-bold text-primary-foreground">D</span><span className="truncate font-serif text-lg font-bold sm:text-xl">DripTech <span className="text-teal">Eco Flow</span></span></Link>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Main navigation">{links.map((link) => <Link key={link.to} to={link.to} activeProps={{ className: "text-teal" }} className="py-2 hover:text-teal">{link.label}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon" className="hidden size-10 border-border bg-transparent shadow-none sm:inline-flex"><Link to="/products" search={{ q: "" }} aria-label="Search products"><Search className="size-4" /></Link></Button>
          <ThemeToggle />
          <Button asChild className="hidden bg-accent text-accent-foreground shadow-none hover:bg-accent/90 sm:inline-flex"><a href={whatsappLink("Hello DripTech, I need help choosing an irrigation system.")} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Get help</a></Button>
          <Button variant="outline" size="icon" onClick={() => setOpen((value) => !value)} className="size-10 border-border bg-transparent shadow-none lg:hidden" aria-label="Toggle menu">{open ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
        </div>
      </div>
      {open && <nav className="grid border-t border-border px-4 py-3 lg:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="py-3 text-sm font-semibold">{link.label}</Link>)}</nav>}
    </header>
  </>;
}
