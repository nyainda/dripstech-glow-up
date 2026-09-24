import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/greenhouse-drip-irrigation-kenya"]!;
export const Route = createFileRoute("/greenhouse-drip-irrigation-kenya")({ head: () => pageHead("/greenhouse-drip-irrigation-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/greenhouse-drip-irrigation-kenya" /> });
