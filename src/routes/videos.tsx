import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/videos"]!;
export const Route = createFileRoute("/videos")({ head: () => pageHead("/videos", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/videos" /> });
