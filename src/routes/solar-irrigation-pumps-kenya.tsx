import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/solar-irrigation-pumps-kenya"]!;
export const Route = createFileRoute("/solar-irrigation-pumps-kenya")({ head: () => pageHead("/solar-irrigation-pumps-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/solar-irrigation-pumps-kenya" /> });
