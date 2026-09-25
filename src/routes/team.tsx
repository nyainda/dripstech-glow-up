import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/team"]!;
export const Route = createFileRoute("/team")({ head: () => pageHead("/team", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("team"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/team" /><LiveContent heading="Meet the team" items={items} /></>; }
