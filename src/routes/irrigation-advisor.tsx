import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, MessageCircle, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductCard } from "@/components/storefront/product-card";
import { recommendProducts, type AdvisorResult } from "@/lib/advisor.functions";
import { pageHead, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/irrigation-advisor")({
  head: () => pageHead("/irrigation-advisor", "Irrigation Product Advisor | DripTech Eco Flow", "Describe your farm, crops and water source and get suitable irrigation products recommended from the DripTech catalogue, with reasons."),
  component: AdvisorPage,
});

const examples = [
  "Half an acre of tomatoes in a greenhouse in Kiambu, water from a 10,000 litre tank.",
  "2 acres of maize near Nakuru, borehole water, no mains power.",
  "Small kitchen garden of vegetables, want to water with a timer.",
];

function AdvisorPage() {
  const recommend = useServerFn(recommendProducts);
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (needs.trim().length < 10 || loading) return;
    setLoading(true); setResult(null);
    try { setResult(await recommend({ data: { needs } })); }
    catch { setResult({ ok: false, error: "Something went wrong. Please try again." }); }
    finally { setLoading(false); }
  }

  return <>
    <section className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase text-teal"><Sprout className="size-4" />Product advisor</p>
        <h1 className="mt-4 font-serif text-4xl font-bold">Tell us about your farm. We'll suggest the right equipment.</h1>
        <p className="mt-4 text-muted-foreground">Describe your crop, land size, location and water source. Our advisor picks matching products from our live catalogue and explains why.</p>
        <form onSubmit={submit} className="mt-8 space-y-3">
          <label htmlFor="needs" className="text-sm font-semibold">Your irrigation needs</label>
          <Textarea id="needs" value={needs} onChange={(e) => setNeeds(e.target.value)} maxLength={1500} rows={5} placeholder="e.g. 1 acre of onions in Machakos, water from a borehole, want drip irrigation..." className="bg-background" />
          <div className="flex flex-wrap gap-2">{examples.map((ex) => <button key={ex} type="button" onClick={() => setNeeds(ex)} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-teal hover:text-foreground">{ex}</button>)}</div>
          <Button type="submit" disabled={loading || needs.trim().length < 10} className="mt-2">{loading ? <><Loader2 className="size-4 animate-spin" />Finding products…</> : "Get recommendations"}</Button>
        </form>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-live="polite">
      {loading && <p className="text-center text-muted-foreground">Checking our catalogue for the best fit. This takes a few seconds…</p>}
      {result && !result.ok && <div className="mx-auto max-w-2xl rounded-lg border border-destructive/40 p-5 text-center"><p>{result.error}</p><Button asChild variant="outline" className="mt-4"><a href={whatsappLink(`Hello DripTech, I need irrigation advice: ${needs}`)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Ask on WhatsApp</a></Button></div>}
      {result?.ok && <>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-2xl font-bold">Suggested setup</h2>
          <p className="mt-3 leading-7">{result.summary}</p>
          {result.tips.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{result.tips.map((t) => <li key={t}>{t}</li>)}</ul>}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.picks.map(({ product, reason }) => <div key={product.id} className="flex flex-col gap-3"><p className="rounded-md border-l-4 border-teal bg-muted/50 p-3 text-sm leading-6"><span className="font-semibold">Why: </span>{reason}</p><ProductCard product={product} /></div>)}
        </div>
        <div className="mt-10 text-center"><Button asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"><a href={whatsappLink(`Hello DripTech, the advisor suggested: ${result.picks.map((p) => p.product.name).join(", ")}. My needs: ${needs}. Please send a quote.`)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Get a quote for this setup</a></Button></div>
      </>}
    </section>
  </>;
}
