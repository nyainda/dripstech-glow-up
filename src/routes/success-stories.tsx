import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/success-stories"]!;
export const Route = createFileRoute("/success-stories")({ head: () => pageHead("/success-stories", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("success-stories"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/success-stories" /><LiveContent heading="Customer success stories" items={items} /></>; }
