import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/content-page";
import { contentPages } from "@/lib/content-pages";
import { pageHead } from "@/lib/site";
import { LiveContent } from "@/components/live-content";
import { fetchLive } from "@/lib/content-api";
const page = contentPages["/installation-guides"]!;
export const Route = createFileRoute("/installation-guides")({ head: () => pageHead("/installation-guides", `${page.title} | DripTech Eco Flow`, page.description), loader: () => fetchLive("documents"), component: Page });
function Page() { const items = Route.useLoaderData(); return <><ContentPage path="/installation-guides" /><LiveContent heading="Guides and documents" items={items} /></>; }
