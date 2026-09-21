import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/products/$category")({ component: () => <Outlet /> });
