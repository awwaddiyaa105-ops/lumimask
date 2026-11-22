import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const POLICY_UPDATED = "November 6, 2026";
export const CONTACT_EMAIL = "awwaddiyaa105@gmail.com";

export function policyHead(slug: string, title: string, description: string) {
  const url = `https://shoplumimask.com/${slug}`;
  return {
    meta: [
      { title: `${title} — LumiMask` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — LumiMask` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function PolicyLinks() {
  const cls = "hover:text-foreground";
  return (
    <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
      <Link to="/terms" className={cls}>Terms of Service</Link>
      <Link to="/privacy" className={cls}>Privacy Policy</Link>
      <Link to="/shipping" className={cls}>Shipping Policy</Link>
      <Link to="/refunds" className={cls}>Refund Policy</Link>
    </nav>
  );
}

export function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/80">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Lumi<span className="text-primary text-glow">Mask</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Shop</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-4xl md:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {POLICY_UPDATED}</p>
        <div className="mt-8 space-y-5 text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-foreground [&_a]:text-primary">
          {children}
        </div>
      </main>
      <footer className="border-t border-border py-8">
        <PolicyLinks />
      </footer>
    </div>
  );
}
