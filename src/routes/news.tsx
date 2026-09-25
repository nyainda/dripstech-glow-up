import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/news"]!;
export const Route = createFileRoute("/news")({ head: () => pageHead("/news", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("news"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/news" /><LiveContent heading="Latest news" items={items} articleKind="news" /></>; }
