import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/about"];
export const Route = createFileRoute("/about")({ head: () => pageHead("/about", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/about" /> });
