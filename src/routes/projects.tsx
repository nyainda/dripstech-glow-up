import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/projects"]!;
export const Route = createFileRoute("/projects")({ head: () => pageHead("/projects", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/projects" /> });
