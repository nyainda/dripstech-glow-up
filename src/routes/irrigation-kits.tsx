import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/irrigation-kits"]!;
export const Route = createFileRoute("/irrigation-kits")({ head: () => pageHead("/irrigation-kits", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("irrigation-kits"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/irrigation-kits" /><LiveContent heading="Available irrigation kits" items={items} orderable /></>; }
