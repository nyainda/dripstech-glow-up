import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/contact"];
export const Route = createFileRoute("/contact")({ head: () => pageHead("/contact", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/contact" /> });
