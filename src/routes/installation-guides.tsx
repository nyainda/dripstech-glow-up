import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/installation-guides"];
export const Route = createFileRoute("/installation-guides")({ head: () => pageHead("/installation-guides", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/installation-guides" /> });
