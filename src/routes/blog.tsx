import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/blog"]!;
export const Route = createFileRoute("/blog")({ head: () => pageHead("/blog", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("blog"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/blog" /><LiveContent heading="Latest articles" items={items} /></>; }
