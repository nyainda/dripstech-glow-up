# Complete DripTech Frontend Upgrade

## Goal
Rebuild the full public website—not only the homepage—around the approved Field Manual design while preserving the existing backend, every live product, established URLs, business content, and search visibility. WhatsApp remains the primary buying path.

## What will be restored and improved

### 1. Shared storefront foundation
- Create one consistent header, full navigation, mobile menu, footer, contact details, and floating WhatsApp action across every public page.
- Preserve the approved Water & Crop palette, Libre Baskerville headings, IBM Plex Sans body, restrained corners, and product-first editorial style.
- Add a light/dark theme control that follows the visitor’s device on first visit and remembers their choice.
- Use semantic colours throughout so every page and dialog remains readable in both themes.

### 2. Complete product catalogue
- Replace the 24-product homepage subset as the main catalogue with a dedicated `/products` experience connected to the existing live API.
- Include every API category: accessories, controls, drip irrigation, emitters, fertigation, filtration, pipes and fittings, pumps and motors, sprinklers, valves, and all other categories returned by the backend.
- Keep the homepage focused on featured products while linking clearly to the full catalogue.
- Add search, category and subcategory filters, stock filtering, sorting, page controls, result counts, and useful empty/error states.
- Preserve product images, descriptions, model numbers, variants, features, applications, specifications, files, videos, stock, and prices where supplied.

### 3. Individual product pages and WhatsApp sales flow
- Give each product a permanent, shareable, search-friendly URL under its category.
- Show a clear image gallery, current price or “ask for price”, stock status, model, specifications, features, applications, supporting documents, and related products.
- Generate a pre-filled WhatsApp order message containing the exact product, price or variant, product URL, and delivery prompt.
- Keep quick product previews where helpful, but never use them instead of the permanent page.

### 4. Restore the original public website
- Rebuild the original public routes in the new visual system: Services, Technician Services/Booking, Installation Guides, Technical Support, Projects, Case Studies, Success Stories, About, Team/Technicians, Contact, Careers, News, Blog, Videos, Certifications, Irrigation Kits, Privacy, Terms, and Cookies.
- Restore the ten established Kenya-focused SEO landing pages and their internal links.
- Connect each data-driven page to the matching existing API endpoint where available; preserve useful original content where it is static.
- Restore contact, quote, consultation, technician-booking, newsletter, and downloadable-resource journeys only against the existing backend contracts; no replacement backend or invented workflow.
- Keep admin and operational capabilities intact rather than exposing them as public navigation. Any admin migration requiring unavailable authentication or private configuration will be isolated and reported rather than replaced.

### 5. SEO preservation and repair
- Preserve every established public URL so existing links do not become 404 pages; use redirects only for true aliases such as `/catalog`.
- Add a unique title, description, canonical URL, Open Graph title/description/type, and Twitter card to every content route.
- Add product structured data, breadcrumbs, organization/local-business data, website search data, and article data only where the visible page supports it.
- Restore and update `robots.txt`, `sitemap.xml`, favicon/logo assets, crawl directives, language/region signals, and social preview metadata.
- Keep the two verified phone numbers, emails, Nairobi location, payment methods, and social profiles consistent across visible pages and structured data.
- Ensure headings, links, image alternatives, product copy, and internal navigation are crawlable without relying on a modal.

### 6. Quality checks
- Test desktop and mobile catalogue browsing, search, filtering, pagination, permanent product links, theme persistence, dialogs, documents, and WhatsApp messages.
- Check every public route for a successful response, correct metadata, no broken internal links, and no browser errors.
- Verify loading speed basics: responsive images, lazy loading below the first screen, stable image dimensions, minimal blocking work, and reduced-motion support.

## Technical details
- Keep TanStack Start and the current API; do not reintroduce the old router or replace working backend logic.
- Expand the catalogue model to the full API response and use server-rendered route loaders for indexable catalogue/product content.
- Build reusable storefront layout, product card, product detail, metadata, and theme modules before adding route pages.
- Retain fallbacks only for temporary API failure; fallbacks will never silently replace or limit the full live catalogue.
- Work in stages so the product catalogue, product pages, themes, and critical SEO land first, followed by the remaining public content and API-backed forms.
