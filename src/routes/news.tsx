import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/news"]!;
export const Route = createFileRoute("/news")({ head: () => pageHead("/news", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/news" /> });
