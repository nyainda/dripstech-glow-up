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
};

export const catalogueCategories = [
  { key: "all", label: "All equipment" },
  { key: "drip_irrigation", label: "Drip irrigation" },
  { key: "pumps_motors", label: "Pumps & motors" },
  { key: "filtration_systems", label: "Filtration" },
  { key: "pipes_fittings", label: "Pipes & fittings" },
] as const;

const catalogueUrl = "https://dripstech-api.dripstech.workers.dev";

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normaliseProduct(value: unknown): CatalogueProduct | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || typeof item.name !== "string" || typeof item.category !== "string") return null;

  return {
    id: item.id,
    name: item.name,
    model_number: typeof item.model_number === "string" ? item.model_number : null,
    category: item.category,
    subcategory: typeof item.subcategory === "string" ? item.subcategory : null,
    description: typeof item.description === "string" ? item.description : null,
    price: typeof item.price === "number" ? item.price : null,
    images: strings(item.images),
    in_stock: item.in_stock === true || item.in_stock === 1,
    featured: item.featured === true || item.featured === 1,
    features: strings(item.features),
    applications: strings(item.applications),
  };
}

async function fetchCategory(category: string): Promise<CatalogueProduct[]> {
  const params = new URLSearchParams({ category, in_stock: "true", limit: "6" });
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
  const categories = catalogueCategories.slice(1).map((category) => category.key);
  const results = await Promise.allSettled(categories.map(fetchCategory));
  const products = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  if (products.length === 0) throw new Error("The live catalogue is temporarily unavailable");
  return products;
}

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