import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/case-studies"]!;
export const Route = createFileRoute("/case-studies")({ head: () => pageHead("/case-studies", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/case-studies" /> });
