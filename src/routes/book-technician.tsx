import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
const page = contentPages["/book-technician"]!;
export const Route = createFileRoute("/book-technician")({ head: () => pageHead("/book-technician", `${page.title} | DripTech Eco Flow`, page.description), component: () => <ContentPage path="/book-technician" /> });
