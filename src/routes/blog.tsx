import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/blog"];
export const Route = createFileRoute("/blog")({ head: () => pageHead("/blog", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/blog" /> });
