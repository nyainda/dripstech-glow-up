export const SITE = {
  name: "DripTech Eco Flow",
  url: "https://www.dripstech.co.ke",
  phone: "+254723407849",
  phoneDisplay: "0723 407 849",
  phoneSecondary: "+254757716018",
  phoneSecondaryDisplay: "0757 716 018",
  email: "info@dripstech.co.ke",
  emailAlt: "driptechs.info@gmail.com",
  location: "Nairobi, Kenya",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string) {
  return `${SITE.url}${path === "/" ? "/" : path}`;
}

export function pageHead(path: string, title: string, description: string, type = "website") {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_KE" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "geo.region", content: "KE" },
      { name: "geo.placename", content: "Nairobi" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store", "Organization"],
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  telephone: [SITE.phone, SITE.phoneSecondary],
  email: SITE.email,
  priceRange: "KES",
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, M-Pesa, Bank Transfer",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressRegion: "Nairobi", addressCountry: "KE" },
  areaServed: { "@type": "Country", name: "Kenya" },
  sameAs: ["https://www.facebook.com/dripstech", "https://www.instagram.com/dripstech"],
};
