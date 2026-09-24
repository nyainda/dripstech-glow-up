import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getFullCatalogue, type CatalogueProduct } from "@/lib/catalog";

const Input = z.object({ needs: z.string().trim().min(10).max(1500) });

export type AdvisorResult =
  | { ok: true; summary: string; tips: string[]; picks: Array<{ product: CatalogueProduct; reason: string }> }
  | { ok: false; error: string };

const STOP = new Set(["the", "and", "for", "with", "my", "a", "an", "of", "to", "in", "on", "i", "need", "want", "have", "is", "it", "we", "our"]);

function shortlist(products: CatalogueProduct[], needs: string) {
  const words = needs.toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => w.length > 2 && !STOP.has(w)) ?? [];
  const scored = products.map((p) => {
    const text = `${p.name} ${p.category} ${p.subcategory ?? ""} ${p.description ?? ""} ${p.applications.join(" ")}`.toLowerCase();
    let score = p.in_stock ? 1 : 0;
    for (const w of words) if (text.includes(w)) score += 3;
    return { p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  // Always include a spread of categories so the model can build a full system.
  const picked = new Map<string, CatalogueProduct>();
  for (const { p } of scored.slice(0, 90)) picked.set(p.id, p);
  const perCat = new Map<string, number>();
  for (const { p } of scored) {
    const n = perCat.get(p.category) ?? 0;
    if (n < 4) { picked.set(p.id, p); perCat.set(p.category, n + 1); }
  }
  return [...picked.values()].slice(0, 130);
}

export const recommendProducts = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<AdvisorResult> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "The advisor is not configured yet." };

    let products: CatalogueProduct[];
    try { products = await getFullCatalogue(); } catch { return { ok: false, error: "We couldn't load the product list right now. Please try again shortly." }; }

    const candidates = shortlist(products, data.needs);
    const byId = new Map(candidates.map((p) => [p.id, p]));
    const list = candidates.map((p) => `${p.id} | ${p.name} | ${p.category}${p.subcategory ? "/" + p.subcategory : ""} | ${p.price === null ? "price on request" : "KSh " + p.price} | ${p.in_stock ? "in stock" : "check stock"} | ${(p.description ?? "").slice(0, 120)}`).join("\n");

    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText, Output, NoObjectGeneratedError } = await import("ai");
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    const schema = z.object({
      summary: z.string(),
      tips: z.array(z.string()),
      picks: z.array(z.object({ id: z.string(), reason: z.string() })),
    });

    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        output: Output.object({ schema }),
        system: "You are an irrigation equipment advisor for DripTech Eco Flow, a Kenyan supplier. Recommend only products from the provided list, using their exact ids. Pick 3 to 6 products that together meet the shopper's needs, preferring in-stock items. For each, give a one or two sentence plain-English reason tied to their farm. The summary is 2-3 sentences describing the suggested setup. Give up to 3 short practical tips. Never invent prices or products.",
        prompt: `Shopper's needs:\n${data.needs}\n\nAvailable products (id | name | category | price | stock | description):\n${list}`,
        providerOptions: { openai: { forceReasoning: true, reasoningEffort: "low", store: false } },
      });
      const out = await result.output;
      const picks = out.picks.flatMap((pick) => { const product = byId.get(pick.id); return product ? [{ product, reason: pick.reason }] : []; }).slice(0, 6);
      if (picks.length === 0) return { ok: false, error: "We couldn't find a good match. Try adding crop, farm size and water source." };
      return { ok: true, summary: out.summary, tips: out.tips.slice(0, 3), picks };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) return { ok: false, error: "The advisor gave an unclear answer. Please try again." };
      const status = (error as { statusCode?: number }).statusCode;
      console.error(error);
      if (status === 429) return { ok: false, error: "Too many requests right now. Please wait a moment and try again." };
      if (status === 402) return { ok: false, error: "The advisor is temporarily unavailable. Please contact us on WhatsApp." };
      return { ok: false, error: "Something went wrong. Please try again or chat with us on WhatsApp." };
    }
  });
