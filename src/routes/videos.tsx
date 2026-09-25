import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/videos"]!;
export const Route = createFileRoute("/videos")({ head: () => pageHead("/videos", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("videos"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/videos" /><LiveContent heading="Videos" items={items} /></>; }
