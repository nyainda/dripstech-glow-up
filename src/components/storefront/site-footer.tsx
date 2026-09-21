import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

const groups = [
  { title: "Products", links: [["All products", "/products"], ["Drip irrigation", "/products/drip"], ["Sprinklers", "/products/sprinklers"], ["Pumps", "/products/pumps"], ["Irrigation kits", "/irrigation-kits"]] },
  { title: "Support", links: [["Services", "/services"], ["Installation guides", "/installation-guides"], ["Technical support", "/technical-support"], ["Book a technician", "/book-technician"], ["Contact", "/contact"]] },
  { title: "Company", links: [["About", "/about"], ["Projects", "/projects"], ["Success stories", "/success-stories"], ["Blog", "/blog"], ["Careers", "/careers"]] },
] as const;

export function SiteFooter() {
  return <footer className="border-t border-border bg-brand-dark text-brand-light/75">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
      <div className="sm:col-span-2"><p className="font-serif text-xl font-bold text-brand-light">DripTech Eco Flow</p><p className="mt-3 max-w-sm text-sm leading-6">Irrigation equipment, practical sizing, installation support and nationwide delivery for Kenyan farms.</p><div className="mt-5 space-y-2 text-sm"><a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-brand-light"><Phone className="size-4 text-gold" />{SITE.phoneDisplay} / {SITE.phoneSecondaryDisplay}</a><a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-brand-light"><Mail className="size-4 text-gold" />{SITE.email}</a><p className="flex items-center gap-2"><MapPin className="size-4 text-gold" />{SITE.location}</p></div></div>
      {groups.map((group) => <div key={group.title}><h2 className="text-sm font-bold text-brand-light">{group.title}</h2><ul className="mt-4 space-y-3 text-sm">{group.links.map(([label, to]) => <li key={to}><Link to={to} className="hover:text-gold">{label}</Link></li>)}</ul></div>)}
    </div>
    <div className="border-t border-brand-light/10"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><span>© 2026 DripTech Eco Flow. All rights reserved.</span><div className="flex gap-5"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/cookies">Cookies</Link></div></div></div>
    <a href={whatsappLink("Hello DripTech, I would like help with irrigation equipment.")} target="_blank" rel="noreferrer" aria-label="Chat with DripTech on WhatsApp" className="fixed bottom-4 right-4 z-30 grid size-12 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg"><MessageCircle className="size-5" /></a>
  </footer>;
}
