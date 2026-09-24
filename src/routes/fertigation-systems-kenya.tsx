import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/fertigation-systems-kenya"]!;
export const Route = createFileRoute("/fertigation-systems-kenya")({ head: () => pageHead("/fertigation-systems-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/fertigation-systems-kenya" /> });
