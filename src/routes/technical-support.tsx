import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/technical-support"]!;
export const Route = createFileRoute("/technical-support")({ head: () => pageHead("/technical-support", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/technical-support" /> });
