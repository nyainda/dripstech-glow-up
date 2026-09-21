import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CataloguePage } from "@/components/storefront/catalogue-page";
import { categoryLabel, getFullCatalogue, pathCategory } from "@/lib/catalog";
import { pageHead } from "@/lib/site";
const productsQuery = queryOptions({ queryKey: ["complete-catalogue"], queryFn: getFullCatalogue, staleTime: 1000 * 60 * 10 });
export const Route = createFileRoute("/products/$category/")({ loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery), head: ({ params }) => { const label = categoryLabel(pathCategory[params.category] ?? params.category); return pageHead(`/products/${params.category}`, `${label} in Kenya | DripTech Eco Flow`, `Shop ${label.toLowerCase()} with current prices, specifications, stock information and nationwide delivery from DripTech Eco Flow.`); }, component: CategoryPage });
function CategoryPage() { const { data } = useSuspenseQuery(productsQuery); const { category } = Route.useParams(); return <CataloguePage products={data} initialCategory={category} />; }
