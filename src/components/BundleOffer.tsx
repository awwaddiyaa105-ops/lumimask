import { useEffect, useState } from "react";
import { Lock, ShoppingBag, Tag } from "lucide-react";

import maskSideAsset from "@/assets/lumimask-side-glow.webp.asset.json";
import pureRoseAsset from "@/assets/lumipure-rose.webp.asset.json";
import { BuyButton } from "@/components/BuyButton";
import { Button } from "@/components/ui/button";
import {
  BUNDLE_OFFER_END_ISO,
  BUNDLE_OFFER_END_MS,
  BUNDLE_OFFER_NAME,
  BUNDLE_OFFER_START_ISO,
  BUNDLE_OFFER_START_MS,
  getBundleCountdown,
  getBundleOfferCopy,
  getBundleOfferPhase,
} from "@/lib/bundle-offer";
import { formatPrice, type Region } from "@/lib/store";

const COUNTDOWN_LABELS = {
  days: "Days",
  hours: "Hours",
  minutes: "Mins",
  seconds: "Secs",
} as const;

export function BundleOffer({ region }: { region: Region }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const phase = now === null ? "upcoming" : getBundleOfferPhase(now);
  const isActive = phase === "active";
  const hasEnded = phase === "ended";
  const target = isActive ? BUNDLE_OFFER_END_MS : BUNDLE_OFFER_START_MS;
  const countdown = getBundleCountdown(now ?? BUNDLE_OFFER_START_MS, target);
  const bundlePrice = formatPrice(region, "bundle");
  const compareAtPrice = formatPrice(region, "bundle-compare");
  const offerCopy = getBundleOfferCopy(region.code);

  return (
    <section id="bundle" className="relative overflow-hidden border-t border-primary/10 bg-burgundy">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-60" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <Tag className="size-4" /> {BUNDLE_OFFER_NAME}
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] md:text-5xl">
            {hasEnded ? (
              "The Black Friday Deal has ended."
            ) : (
              <>
                LumiMask and LumiPure, <span className="text-gold">together</span> for less.
              </>
            )}
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            {hasEnded
              ? "LumiMask and LumiPure are still available individually in the collection."
              : "Buy LumiMask with LumiPure and get 50% off LumiPure — the complete pair for less."}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <img
              src={maskSideAsset.url}
              alt="LumiMask LED face mask glowing red"
              width={572}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl border border-primary/15 object-cover shadow-card"
            />
            <img
              src={pureRoseAsset.url}
              alt="LumiPure pore cleansing device beside a red rose"
              width={572}
              height={1024}
              loading="lazy"
              className="mt-8 aspect-[4/5] w-full rounded-3xl border border-primary/15 object-cover shadow-card"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-glass-strong p-6 shadow-glow md:p-8">
          <p className="text-sm font-semibold text-foreground">
            {BUNDLE_OFFER_NAME} · LumiMask + LumiPure
          </p>
          {!hasEnded && (
            <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-1">
              <p className="font-display text-5xl text-primary md:text-6xl">{bundlePrice}</p>
              <p className="pb-1 text-lg text-muted-foreground">
                <span className="sr-only">Instead of </span>
                <s>{compareAtPrice}</s>
              </p>
            </div>
          )}
          <p className="mt-3 text-sm text-muted-foreground">
            {hasEnded
              ? "Thank you for your interest in The Black Friday Deal."
              : "50% off LumiPure when you buy both together. Shipping and taxes, if any, appear at checkout."}
          </p>

          <div className="mt-7 border-t border-primary/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {hasEnded ? "Deal ended" : isActive ? "Time left" : "Deal starts in"}
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2" aria-label="The Black Friday Deal countdown">
              {Object.entries(countdown).map(([unit, value]) => (
                <div key={unit} className="rounded-2xl border border-primary/15 bg-background/50 px-2 py-3 text-center">
                  <p className="font-display text-2xl tabular-nums md:text-3xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {COUNTDOWN_LABELS[unit as keyof typeof COUNTDOWN_LABELS]}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
              {hasEnded ? offerCopy.ended : isActive ? offerCopy.ends : offerCopy.starts}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Offer times for {region.label} · {offerCopy.timeZoneLabel}
            </p>
            <time dateTime={BUNDLE_OFFER_START_ISO} className="sr-only">
              Offer starts {offerCopy.start}
            </time>
            <time dateTime={BUNDLE_OFFER_END_ISO} className="sr-only">
              Offer ends {offerCopy.end}
            </time>
          </div>

          <div className="mt-7">
            {isActive ? (
              <BuyButton product="bundle" label={`Buy both · ${bundlePrice}`} className="w-full rounded-full" />
            ) : hasEnded ? (
              <Button asChild variant="outline" size="xl" className="w-full rounded-full border-primary/25 bg-transparent">
                <a href="#shop">
                  <ShoppingBag /> Shop the collection
                </a>
              </Button>
            ) : (
              <Button variant="glow" size="xl" className="w-full rounded-full" disabled>
                <ShoppingBag /> {offerCopy.availableAt}
              </Button>
            )}
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <Lock className="size-3.5 shrink-0" /> Both products open together in Shopify's secure checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}