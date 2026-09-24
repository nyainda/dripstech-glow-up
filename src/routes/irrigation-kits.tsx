import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/irrigation-kits"]!;
export const Route = createFileRoute("/irrigation-kits")({ head: () => pageHead("/irrigation-kits", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/irrigation-kits" /> });
