import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/drip-irrigation-kit-price-kenya"];
export const Route = createFileRoute("/drip-irrigation-kit-price-kenya")({ head: () => pageHead("/drip-irrigation-kit-price-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/drip-irrigation-kit-price-kenya" /> });
