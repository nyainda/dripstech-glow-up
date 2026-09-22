import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/technician-services"];
export const Route = createFileRoute("/technician-services")({ head: () => pageHead("/technician-services", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/technician-services" /> });
