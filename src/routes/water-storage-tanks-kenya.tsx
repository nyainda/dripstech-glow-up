import { createFileRoute } from "@tanstack/react-router";
import { SeoContentPage } from "@/components/seo-content-page";
import { seoPages } from "@/lib/seo-pages";
import { pageHead } from "@/lib/site";
const page = seoPages["/water-storage-tanks-kenya"]!;
export const Route = createFileRoute("/water-storage-tanks-kenya")({ head: () => pageHead("/water-storage-tanks-kenya", `${page[0]} | DripTech Eco Flow`, page[1]), component: () => <SeoContentPage path="/water-storage-tanks-kenya" /> });
