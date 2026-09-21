import type { ReactNode } from "react";
import { SiteHeader } from "@/components/storefront/site-header";
import { SiteFooter } from "@/components/storefront/site-footer";
export function SiteLayout({ children }: { children: ReactNode }) { return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div>; }
