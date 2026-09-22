import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/success-stories"];
export const Route = createFileRoute("/success-stories")({ head: () => pageHead("/success-stories", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/success-stories" /> });
