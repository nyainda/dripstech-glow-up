import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/team"]!;
export const Route = createFileRoute("/team")({ head: () => pageHead("/team", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/team" /> });
