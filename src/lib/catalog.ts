export type CatalogueProduct = {
  id: string;
  name: string;
  model_number: string | null;
  category: string;
  subcategory: string | null;
  description: string | null;
  price: number | null;
  images: string[];
  in_stock: boolean;
  featured: boolean;
  features: string[];
  applications: string[];
  specifications: Record<string, string | number | boolean>;
  variants: Array<{ name: string; price: number; in_stock: boolean }>;
  brochure_url: string | null;
  installation_guide_url: string | null;
  maintenance_manual_url: string | null;
  video_url: string | null;
};

export const catalogueCategories = [
  { key: "all", label: "All equipment" },
  { key: "accessories", label: "Accessories", path: "accessories" },
  { key: "control_systems", label: "Control systems", path: "controls" },
  { key: "drip_irrigation", label: "Drip irrigation" },
  { key: "emitters_drippers", label: "Emitters & drippers", path: "emitters" },
  { key: "fertigation_systems", label: "Fertigation", path: "fertigation" },
  { key: "pumps_motors", label: "Pumps & motors" },
  { key: "filtration_systems", label: "Filtration" },
  { key: "pipes_fittings", label: "Pipes & fittings" },
  { key: "sprinkler_systems", label: "Sprinklers", path: "sprinklers" },
  { key: "valves_regulators", label: "Valves & regulators", path: "valves" },
] as const;

const catalogueUrl = "https://dripstech-api.dripstech.workers.dev";

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function normaliseProduct(value: unknown): CatalogueProduct | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item["id"] !== "string" || typeof item["name"] !== "string" || typeof item["category"] !== "string") return null;

  return {
    id: item["id"],
    name: item["name"],
    model_number: typeof item["model_number"] === "string" ? item["model_number"] : null,
    category: item["category"],
    subcategory: typeof item["subcategory"] === "string" ? item["subcategory"] : null,
    description: typeof item["description"] === "string" ? item["description"] : null,
    price: typeof item["price"] === "number" ? item["price"] : null,
    images: strings(item["images"]),
    in_stock: item["in_stock"] === true || item["in_stock"] === 1,
    featured: item["featured"] === true || item["featured"] === 1,
    features: strings(item["features"]),
    applications: strings(item["applications"]),
    specifications: item["specifications"] && typeof item["specifications"] === "object" && !Array.isArray(item["specifications"]) ? item["specifications"] as Record<string, string | number | boolean> : {},
    variants: Array.isArray(item["variants"]) ? item["variants"].flatMap((variant) => {
      if (!variant || typeof variant !== "object") return [];
      const row = variant as Record<string, unknown>;
      return typeof row["name"] === "string" && typeof row["price"] === "number" ? [{ name: row["name"], price: row["price"], in_stock: row["in_stock"] === true || row["in_stock"] === 1 }] : [];
    }) : [],
    brochure_url: typeof item["brochure_url"] === "string" ? item["brochure_url"] : null,
    installation_guide_url: typeof item["installation_guide_url"] === "string" ? item["installation_guide_url"] : null,
    maintenance_manual_url: typeof item["maintenance_manual_url"] === "string" ? item["maintenance_manual_url"] : null,
    video_url: typeof item["video_url"] === "string" ? item["video_url"] : null,
  };
}

export async function fetchProducts(filters: { category?: string; search?: string; inStock?: boolean; limit?: number; page?: number } = {}): Promise<CatalogueProduct[]> {
  const params = new URLSearchParams({ limit: String(filters.limit ?? 300) });
  if (filters.category && filters.category !== "all") params.set("category", filters.category);
  if (filters.search) params.set("search", filters.search);
  if (filters.inStock) params.set("in_stock", "true");
  if (filters.page) params.set("page", String(filters.page));
  const response = await fetch(`${catalogueUrl}/api/products?${params}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Catalogue request failed with ${response.status}`);
  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) throw new Error("Catalogue returned an unexpected response");
  return payload.map(normaliseProduct).filter((product): product is CatalogueProduct => product !== null);
}

export async function getFeaturedCatalogue(): Promise<CatalogueProduct[]> {
  const categories = ["drip_irrigation", "pumps_motors", "filtration_systems", "pipes_fittings"];
  const results = await Promise.allSettled(categories.map((category) => fetchProducts({ category, inStock: true, limit: 6 })));
  const products = results.flatMap((result) => result.status === "fulfilled" ? result.value : []).slice(0, 24);
  if (products.length === 0) throw new Error("The live catalogue is temporarily unavailable");
  return products;
}

export async function getProduct(id: string): Promise<CatalogueProduct> {
  const response = await fetch(`${catalogueUrl}/api/products/${id}`, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Product request failed with ${response.status}`);
  const product = normaliseProduct(await response.json());
  if (!product) throw new Error("Product returned an unexpected response");
  return product;
}

export const categoryPath: Record<string, string> = {
  accessories: "accessories", control_systems: "controls", drip_irrigation: "drip", emitters_drippers: "emitters", fertigation_systems: "fertigation", filtration_systems: "filtration", pipes_fittings: "pipes", pumps_motors: "pumps", sprinkler_systems: "sprinklers", valves_regulators: "valves",
};
export const pathCategory = Object.fromEntries(Object.entries(categoryPath).map(([key, path]) => [path, key]));
export function productSlug(product: CatalogueProduct) { return `${product.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}--${product.id}`; }

export function categoryLabel(category: string) {
  return catalogueCategories.find((item) => item.key === category)?.label ?? category.replaceAll("_", " ");
}

export function formatPrice(price: number | null) {
  return price === null ? "Ask for price" : new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(price);
}
export async function getFullCatalogue(): Promise<CatalogueProduct[]> {
  const categories = catalogueCategories.slice(1).map((category) => category.key);
  const results = await Promise.allSettled(categories.map((category) => fetchProducts({ category, limit: 300 })));
  const unique = new Map<string, CatalogueProduct>();
  for (const result of results) if (result.status === "fulfilled") for (const product of result.value) unique.set(product.id, product);
  if (unique.size === 0) throw new Error("The live catalogue is temporarily unavailable");
  return [...unique.values()];
}
