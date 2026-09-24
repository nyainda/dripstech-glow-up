import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/irrigation-companies-kenya"]!;
export const Route = createFileRoute("/irrigation-companies-kenya")({ head: () => pageHead("/irrigation-companies-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/irrigation-companies-kenya" /> });
