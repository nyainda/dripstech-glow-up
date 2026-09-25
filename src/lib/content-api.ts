const API = "https://dripstech-api.dripstech.workers.dev";

export type LiveKind = "projects" | "blog" | "news" | "videos" | "team" | "success-stories" | "irrigation-kits" | "documents";

export type LiveItem = {
  id: string;
  title: string;
  text: string;
  image: string | null;
  meta: string[];
  link: string | null;
  linkLabel: string | null;
  price: number | null;
};

type Row = Record<string, unknown>;
const s = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
const arr = (v: unknown): unknown[] => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.startsWith("[")) { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch { return []; } }
  return [];
};
const firstImg = (...vals: unknown[]) => { for (const v of vals) { const x = s(v) ?? s(arr(v)[0]); if (x && x.startsWith("http")) return x; } return null; };
const strip = (html: string | null) => (html ?? "").replace(/<[^>]+>/g, " ").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
const clip = (t: string, n = 220) => (t.length > n ? `${t.slice(0, n).trimEnd()}…` : t);
const date = (v: unknown) => { const d = s(v); if (!d) return null; const t = new Date(d); return isNaN(+t) ? null : t.toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" }); };
const compact = (xs: Array<string | null | undefined | false>) => xs.filter((x): x is string => typeof x === "string" && x.length > 0);

function normalise(kind: LiveKind, r: Row): LiveItem {
  const id = String(r["id"] ?? Math.random());
  const base = { id, link: null, linkLabel: null, price: null } as Pick<LiveItem, "id" | "link" | "linkLabel" | "price">;
  switch (kind) {
    case "projects":
      return { ...base, title: s(r["name"]) ?? "Project", text: clip(strip(s(r["testimonial"]))), image: firstImg(r["project_images"], r["after_images"], r["before_images"]), meta: compact([s(r["location"]), s(r["project_type"]), s(r["area_covered"]) && `Area: ${r["area_covered"]}`, s(r["water_saved"]) && `Water saved: ${r["water_saved"]}`, s(r["yield_improvement"]) && `Yield: ${r["yield_improvement"]}`]) };
    case "blog":
    case "news":
      return { ...base, title: s(r["title"]) ?? "Article", text: clip(strip(s(r["excerpt"]) ?? s(r["content"]))), image: firstImg(r["featured_image_url"], r["featured_image"]), meta: compact([date(r["published_at"] ?? r["created_at"]), s(r["category"]), r["reading_time"] ? `${r["reading_time"]} min read` : null]) };
    case "videos":
      return { ...base, title: s(r["title"]) ?? "Video", text: clip(strip(s(r["description"]))), image: firstImg(r["thumbnail_url"]), meta: compact([s(r["category"]), s(r["duration"])]), link: s(r["video_url"]), linkLabel: "Watch video" };
    case "team":
      return { ...base, title: s(r["name"]) ?? "Team member", text: clip(strip(s(r["bio"])), 320), image: firstImg(r["image_url"]), meta: compact([s(r["position"])]), link: s(r["linkedin_url"]), linkLabel: "LinkedIn" };
    case "success-stories":
      return { ...base, title: s(r["title"]) ?? "Success story", text: clip(strip(s(r["description"])), 320), image: firstImg(r["image_url"], r["after_image"], r["before_image"]), meta: compact([s(r["client_name"]), s(r["client_company"]), s(r["results"]) && clip(strip(s(r["results"])), 120)]) };
    case "irrigation-kits":
      return { ...base, title: s(r["name"]) ?? "Irrigation kit", text: clip(strip(s(r["description"]))), image: firstImg(r["images"]), meta: compact([s(r["coverage_area"]) ?? s(r["target_area"]), s(r["target_crop"]), r["warranty_months"] ? `${r["warranty_months"]}-month warranty` : null, r["in_stock"] === false || r["in_stock"] === 0 ? "Check availability" : "In stock"]), price: typeof r["price"] === "number" ? r["price"] : null };
    case "documents":
      return { ...base, title: s(r["title"]) ?? "Document", text: clip(strip(s(r["description"]))), image: null, meta: compact([s(r["category"]), date(r["created_at"])]), link: s(r["file_url"]), linkLabel: "Open document" };
  }
}

export async function fetchLive(kind: LiveKind): Promise<LiveItem[]> {
  try {
    const res = await fetch(`${API}/api/${kind}`, { headers: { Accept: "application/json", Origin: "https://www.dripstech.co.ke" }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const json: unknown = await res.json();
    const rows = Array.isArray(json) ? json : Array.isArray((json as Row)?.["data"]) ? ((json as Row)["data"] as unknown[]) : [];
    return rows
      .filter((r): r is Row => !!r && typeof r === "object")
      .filter((r) => r["published"] !== false && r["published"] !== 0 && r["active"] !== false && r["active"] !== 0)
      .map((r) => normalise(kind, r));
  } catch {
    return [];
  }
}
