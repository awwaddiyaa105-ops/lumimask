import { createFileRoute, Link } from "@tanstack/react-router";

import { BuyButton } from "@/components/BuyButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — The LumiMask Story" },
      {
        name: "description",
        content: "Why we started LumiMask: a calming at-home LED face mask ritual without the salon booking.",
      },
      { property: "og:title", content: "About Us — The LumiMask Story" },
      { property: "og:description", content: "The story behind LumiMask and why we made it." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shoplumimask.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://shoplumimask.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-diagonal opacity-[0.35]" />
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-glow blur-3xl animate-pulse-glow" />
        <div className="absolute -left-52 top-1/3 h-[30rem] w-[30rem] rounded-full bg-burgundy opacity-60 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-primary/20 bg-glass px-4 py-2 shadow-card">
          <Link to="/" className="font-display text-lg font-bold uppercase tracking-[0.16em] sm:text-xl">
            Lumi<span className="text-gold">Mask</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground transition hover:text-foreground">
              Shop
            </Link>
            <BuyButton size="sm" className="h-9 rounded-full px-4" />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-2xl px-5 py-16 md:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Our story
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,4.75rem)] font-bold uppercase leading-[0.92]">
            Spa-night <span className="text-gold">glow</span>, at home.
          </h1>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              LumiMask started with a simple idea: a calming self-care moment shouldn't need a salon
              booking.
            </p>
            <p>
              We wanted something light and comfortable you could wear while reading, relaxing or
              winding down — ten quiet minutes, a few evenings a week, that feel like a little spa
              night of your own.
            </p>
            <p>
              Every LumiMask is chosen with care and shipped to customers in the United States,
              Spain, France, the United Kingdom and Canada. Thank you for making it part of your
              ritual.
            </p>
          </div>
          <div className="mt-10">
            <BuyButton className="rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}