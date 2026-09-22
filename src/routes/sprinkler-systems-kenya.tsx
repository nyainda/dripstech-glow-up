import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/sprinkler-systems-kenya"];
export const Route = createFileRoute("/sprinkler-systems-kenya")({ head: () => pageHead("/sprinkler-systems-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/sprinkler-systems-kenya" /> });
