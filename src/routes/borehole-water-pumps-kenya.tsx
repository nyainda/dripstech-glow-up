import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/borehole-water-pumps-kenya"]!;
export const Route = createFileRoute("/borehole-water-pumps-kenya")({ head: () => pageHead("/borehole-water-pumps-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/borehole-water-pumps-kenya" /> });
