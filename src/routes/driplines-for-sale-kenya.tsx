import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/driplines-for-sale-kenya"];
export const Route = createFileRoute("/driplines-for-sale-kenya")({ head: () => pageHead("/driplines-for-sale-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/driplines-for-sale-kenya" /> });
