import { createFileRoute } from "@tanstack/react-router";
import { legalPages } from "@/lib/legal-pages";
import { pageHead } from "@/lib/site";
const page = legalPages["/terms"];
export const Route = createFileRoute("/terms")({ head: () => pageHead("/terms", `${page.title} | DripTech Eco Flow`, page.description), component: Page });
function Page() { return <><section className="border-b border-border bg-muted/40"><div className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><p className="text-xs font-semibold uppercase text-teal">DripTech Eco Flow</p><h1 className="mt-4 font-serif text-4xl font-bold">{page.title}</h1><p className="mt-4 text-muted-foreground">{page.description}</p></div></section><article className="mx-auto max-w-4xl px-4 py-12 sm:px-6"><div className="space-y-8">{page.sections.map(([title, text]) => <section key={title}><h2 className="font-serif text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{text}</p></section>)}</div><p className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">For questions, contact info@dripstech.co.ke.</p></article></>; }
