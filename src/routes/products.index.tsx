import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CataloguePage } from "@/components/storefront/catalogue-page";
import { getFullCatalogue } from "@/lib/catalog";
import { pageHead } from "@/lib/site";
const productsQuery = queryOptions({ queryKey: ["complete-catalogue"], queryFn: getFullCatalogue, staleTime: 1000 * 60 * 10 });
export const Route = createFileRoute("/products/")({ loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery), head: () => pageHead("/products", "Irrigation Products & Prices Kenya | DripTech", "Browse the complete DripTech catalogue of drip irrigation, sprinklers, pumps, filters, pipes, fittings, controls and farm irrigation accessories in Kenya."), component: ProductsPage });
function ProductsPage() { const { data } = useSuspenseQuery(productsQuery); return <CataloguePage products={data} />; }
