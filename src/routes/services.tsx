import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/services"]!;
export const Route = createFileRoute("/services")({ head: () => pageHead("/services", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/services" /> });
