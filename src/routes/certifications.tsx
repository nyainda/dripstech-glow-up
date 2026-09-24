import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/certifications"]!;
export const Route = createFileRoute("/certifications")({ head: () => pageHead("/certifications", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/certifications" /> });
