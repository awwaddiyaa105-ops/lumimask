import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT_EMAIL, PolicyLinks } from "@/components/PolicyPage";
import {
  ArrowUpRight,
  Clock,
  Cpu,
  Droplets,
  Feather,
  Heart,
  Home,
  Instagram,
  Lock,
  Mail,
  Minus,
  Moon,
  Music2,
  Plus,
  RefreshCw,
  ScanFace,
  ShoppingBag,
  Sparkles,
  Sun,
  Tag,
  Truck,
  Usb,
} from "lucide-react";

import maskSideAsset from "@/assets/lumimask-side-glow.webp.asset.json";
import maskEveningAsset from "@/assets/lumimask-evening-ritual.webp.asset.json";
import maskLedAsset from "@/assets/lumimask-led-detail.webp.asset.json";
import maskBathroomAsset from "@/assets/lumimask-bathroom.webp.asset.json";
import maskKitAsset from "@/assets/lumimask-complete-kit.webp.asset.json";
import pureDeviceAsset from "@/assets/lumipure-device.webp.asset.json";
import pureInUseAsset from "@/assets/lumipure-in-use.webp.asset.json";
import pureTankAsset from "@/assets/lumipure-water-tank.webp.asset.json";
import pureAccessoriesAsset from "@/assets/lumipure-accessories.webp.asset.json";
import pureRoseAsset from "@/assets/lumipure-rose.webp.asset.json";
import { BuyButton } from "@/components/BuyButton";
import { MoovExperience } from "@/components/MoovExperience";
import { BundleOffer } from "@/components/BundleOffer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DEFAULT_REGION, REGIONS, formatPrice, type Region } from "@/lib/store";
import { cn } from "@/lib/utils";
import { LIGHT_MODES } from "@/lib/light-modes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LumiMask & LumiPure — At-home Skincare Devices" },
      {
        name: "description",
        content:
          "Shop LumiMask, a 7-color LED face mask, and LumiPure, a water-assisted pore cleansing device. Secure Shopify checkout.",
      },
      { property: "og:title", content: "LumiMask & LumiPure — At-home Skincare Devices" },
      {
        property: "og:description",
        content: "Two simple devices for your at-home skincare ritual, with secure Shopify checkout.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const GALLERY = [
  { src: maskSideAsset.url, alt: "LumiMask face mask glowing red on a dark stone surface" },
  { src: maskEveningAsset.url, alt: "Woman relaxing on a sofa while wearing the LumiMask face mask" },
  { src: maskLedAsset.url, alt: "Close-up of the red LED lights inside LumiMask" },
  { src: maskBathroomAsset.url, alt: "LumiMask face mask beside a mirror and towel" },
  { src: maskKitAsset.url, alt: "LumiMask face mask with its controller, storage bag and manual" },
];

const PURE_GALLERY = [
  { src: pureDeviceAsset.url, alt: "LumiPure water-assisted pore cleansing device" },
  { src: pureInUseAsset.url, alt: "LumiPure being used gently around the nose" },
  { src: pureTankAsset.url, alt: "Close-up of LumiPure's clear water tank" },
  { src: pureAccessoriesAsset.url, alt: "LumiPure with interchangeable tips, charging cable and box" },
  { src: pureRoseAsset.url, alt: "LumiPure standing beside a red rose and folded towel" },
];

const FEATURES = [
  { icon: ScanFace, title: "Full-face coverage", text: "Light reaches your forehead, cheeks and chin." },
  { icon: Sun, title: "7 light modes", text: "Red, blue, yellow, green, purple, cyan and white." },
  { icon: Clock, title: "10-minute sessions", text: "Fits into your evening — read, relax, unwind." },
  { icon: Sparkles, title: "Soft silicone", text: "Lightweight and comfortable against your skin." },
];

const PURE_FEATURES = [
  { icon: Droplets, title: "Water-assisted cleansing", text: "A clear tank lets you add clean water to your routine." },
  { icon: RefreshCw, title: "Interchangeable tips", text: "Choose the attachment that feels most comfortable." },
  { icon: ScanFace, title: "Targeted design", text: "Shaped for the areas around your nose, cheeks and chin." },
  { icon: Usb, title: "USB charging", text: "Recharge with the included cable between sessions." },
];

const LOVED = [
  {
    icon: Clock,
    title: "Ten minutes and you're done",
    text: "The session ends on its own, so there's nothing to time and nothing long to sit through.",
  },
  {
    icon: Moon,
    title: "Fits into your evening",
    text: "Read, scroll or simply close your eyes — LumiMask works while you do what you'd do anyway.",
  },
  {
    icon: Sun,
    title: "Seven modes to choose from",
    text: "Switch between red, blue, yellow, green, purple, cyan and white light whenever you feel like a change.",
  },
  {
    icon: Feather,
    title: "Light on your face",
    text: "Soft silicone and an adjustable strap keep it comfortable from the first minute to the last.",
  },
  {
    icon: Home,
    title: "No bookings, no subscriptions",
    text: "Your ritual happens at home, as often as you like, with no appointments to keep.",
  },
  {
    icon: Tag,
    title: "One price, nothing hidden",
    text: "You pay once at Shopify's secure checkout — no membership and no automatic renewals.",
  },
];

const FAQS = [
  {
    q: "How do I use LumiMask?",
    a: "Start with clean, dry skin. Put on the mask, fasten the strap, choose a light mode and relax for about 10 minutes. The mask switches off automatically when the session ends.",
  },
  {
    q: "How often should I use LumiMask?",
    a: "Most people use LumiMask 3–5 times a week. Consistency matters more than session length.",
  },
  {
    q: "How do I use LumiPure?",
    a: "Start with clean skin. Fill the tank with clean water, choose an attachment, then use light pressure and keep the device moving. Avoid broken or irritated skin, and clean the attachments after each use.",
  },
  {
    q: "Is it safe for my eyes?",
    a: "The eye openings keep light away from your eyes, and you can close your eyes during a session. If you have light sensitivity or an eye condition, check with your doctor first.",
  },
  {
    q: "Who should not use LumiMask?",
    a: "Please talk to a doctor before use if you are pregnant, take light-sensitising medication, or have a skin or medical condition. LumiMask is a cosmetic device and is not intended to treat any disease.",
  },
  {
    q: "How do I pay?",
    a: "Tap Buy now and you'll go to our secure Shopify checkout. We never ask for card details on this website.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We show prices for the United States, Spain, France, the United Kingdom and Canada. Shipping options and the final total appear at checkout.",
  },
  {
    q: "How do I clean the mask?",
    a: "Wipe the inside with a soft, slightly damp cloth after use. Do not submerge it in water.",
  },
];

/* Explore cards — the reference's social/content grid, adapted for LUMIMASK. */
const EXPLORE: {
  href: string;
  icon: typeof ScanFace;
  title: string;
  desc: string;
  external?: boolean;
  route?: boolean;
}[] = [
  { href: "#lumimask", icon: ScanFace, title: "LED Therapy Mask", desc: "Seven light modes, ten-minute sessions and full-face coverage." },
  { href: "#lumipure", icon: Droplets, title: "LumiPure", desc: "Water-assisted pore cleansing with interchangeable tips." },
  { href: "https://www.instagram.com/shop.lumimask/", icon: Instagram, title: "Instagram", desc: "Rituals, routines and real results from the LUMIMASK community.", external: true },
  { href: "https://www.tiktok.com/@xxshoplumimask", icon: Music2, title: "TikTok", desc: "Short rituals and before-afters — follow along for your daily glow.", external: true },
  { href: "#love", icon: Cpu, title: "Our Technology", desc: "The engineering behind every mode, strap and silicone edge." },
  { href: "/about", icon: Heart, title: "About LUMIMASK", desc: "Why we built a calmer kind of at-home skincare.", route: true },
];

function Index() {
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activePureImage, setActivePureImage] = useState(0);
  const price = formatPrice(region);
  const purePrice = formatPrice(region, "lumipure");
  const currentImage = GALLERY[activeImage] ?? GALLERY[0]!;
  const currentPureImage = PURE_GALLERY[activePureImage] ?? PURE_GALLERY[0]!;

  return (
    <div id="top" className="moov-site relative min-h-screen overflow-x-clip pb-28 md:pb-0">
      <MoovExperience />
      {/* Layered atmospheric background — burgundy glows, faint diagonals, geometry */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-diagonal opacity-[0.35]" />
        <div className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-glow blur-3xl animate-pulse-glow" />
        <div className="absolute -left-52 top-1/3 h-[32rem] w-[32rem] rounded-full bg-burgundy opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-burgundy opacity-40 blur-3xl" />
        <div className="absolute right-[12%] top-[22%] h-72 w-72 rounded-full border border-primary/10 animate-drift" />
        <div className="absolute left-[8%] top-[58%] h-40 w-40 rounded-full border border-primary/10" />
      </div>

      {/* ── Floating glass header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-primary/20 bg-glass px-3 py-2 shadow-card sm:px-4">
          <a href="#top" className="flex items-center gap-2.5 pl-1">
            <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30">
              <img
                src={maskSideAsset.url}
                alt=""
                width={36}
                height={36}
                className="size-full object-cover"
              />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-[0.16em] sm:text-xl">
              Lumi<span className="text-gold">Mask</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            <a href="#shop" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">Shop</a>
            <a href="#lumimask" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">LED Mask</a>
            <a href="#love" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">Technology</a>
            <Link to="/about" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">About</Link>
            <a href="#faq" className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <RegionSelect region={region} onChange={setRegion} />
            </span>
            <a
              href="#shop"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <ShoppingBag className="size-4" />
              Shop
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="moov-hero relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:pb-28 md:pt-16">
          {/* Left column */}
          <div className="order-1">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Sparkles className="size-3.5" /> The future of skincare
            </p>
            <h1 className="moov-hero-title font-display text-[clamp(2.75rem,8.5vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
              <span className="moov-hero-line block">Your Skin.</span>
              <span className="moov-hero-line block">Your Ritual.</span>
              <span className="moov-hero-line block">
                Your <span className="text-gold">Glow.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Meet LumiMask for a calming LED light ritual and LumiPure for a fresh,
              water-assisted cleanse — two simple additions to your evening.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="glow" size="xl" className="w-full sm:w-auto">
                <a href="#lumimask">
                  <ShoppingBag />
                  Shop the LED Mask
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full rounded-full border-primary/25 bg-transparent sm:w-auto">
                <a href="#lumipure">
                  Explore LumiPure
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Lock className="size-4 text-primary" /> Secure Shopify checkout
              </li>
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-primary" /> Ships to US, ES, FR, UK, CA
              </li>
            </ul>
          </div>

          {/* Right column — premium product showcase card */}
          <div className="order-2">
            <div className="moov-hero-art relative overflow-hidden rounded-[2rem] border border-primary/25 bg-glass-strong p-6 shadow-glow md:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-burgundy opacity-70 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30">
                  <img src={maskSideAsset.url} alt="" width={48} height={48} className="size-full object-cover" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold uppercase tracking-[0.18em]">LumiMask</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-primary">Modern skincare technology</p>
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-3xl border border-primary/15 bg-background/40">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow opacity-70" />
                <img
                  src={maskSideAsset.url}
                  alt="LumiMask LED face mask glowing red"
                  width={572}
                  height={1024}
                  className="relative aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-fade-bottom" />
              </div>

              <p className="relative mt-6 text-lg text-muted-foreground">
                Discover your next skincare ritual.
              </p>

              <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                <Button asChild variant="glow" size="lg" className="w-full rounded-full">
                  <a href="#lumimask">
                    <Sparkles className="size-4" />
                    Explore LED Mask
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full rounded-full border-primary/25 bg-transparent">
                  <a href="#lumipure">
                    <Droplets className="size-4" />
                    Discover LumiPure
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="moov-marquee" aria-hidden="true">
        <div className="moov-marquee-track">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>LIGHT UP YOUR RITUAL <b>✳</b> SKINCARE IN MOTION <b>✳</b></span>
          ))}
        </div>
      </div>

      {/* ── Explore / content cards ───────────────────────────────────────── */}
      <section id="explore" className="relative border-t border-primary/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Explore LUMIMASK</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            Designed for your <span className="text-gold">ritual.</span>
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPLORE.map((item) => {
              const Icon = item.icon;
              const inner = (
                <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/15 bg-surface p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:border-primary/40 sm:p-8">
                  <Icon
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-4 size-40 text-primary/[0.06] transition duration-500 group-hover:scale-110 group-hover:text-primary/[0.1] sm:size-48"
                    strokeWidth={1}
                  />
                  <span className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-primary/20 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                  <span className="relative flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="relative mt-6 font-display text-2xl">{item.title}</h3>
                  <p className="relative mt-2 max-w-[16rem] text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
              if (item.route) {
                return (
                  <Link key={item.title} to="/about" className="block h-full">
                    {inner}
                  </Link>
                );
              }
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block h-full"
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Shop the collection (two products) ────────────────────────────── */}
      <section id="shop" className="border-t border-primary/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 md:py-24">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary">Shop the collection</p>
          <h2 className="mt-3 text-center font-display text-4xl uppercase md:text-5xl">Choose your ritual</h2>
          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:mt-12 sm:gap-6 md:grid-cols-2">
            <article className="group overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-card transition duration-500 hover:-translate-y-1 hover:border-primary/40">
              <a href="#lumimask" aria-label="View LumiMask details">
                <img
                  src={maskSideAsset.url}
                  alt="LumiMask LED face mask glowing red"
                  width={572}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </a>
              <div className="p-3 sm:p-6 md:p-8">
                <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:block">
                  7-color LED face mask
                </p>
                <div className="mt-1 flex items-end justify-between gap-2 sm:mt-3 sm:gap-4">
                  <h3 className="font-display text-xl uppercase sm:text-3xl md:text-4xl">LumiMask</h3>
                  <p className="font-display text-lg text-primary sm:text-2xl md:text-3xl">{price}</p>
                </div>
                <p className="mt-3 hidden text-sm text-muted-foreground sm:block md:text-base">
                  A soft, flexible face mask with seven light modes and automatic
                  10-minute sessions.
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
                  <Truck className="size-3.5 shrink-0 text-primary" /> Delivery in 8–14 days
                </p>
                <BuyButton className="mt-3 w-full rounded-full sm:mt-6" />
              </div>
            </article>

            <article className="group overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-card transition duration-500 hover:-translate-y-1 hover:border-primary/40">
              <a href="#lumipure" aria-label="View LumiPure details">
                <img
                  src={pureDeviceAsset.url}
                  alt="LumiPure water-assisted pore cleansing device"
                  width={572}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </a>
              <div className="p-3 sm:p-6 md:p-8">
                <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:block">
                  Water-assisted pore cleansing
                </p>
                <div className="mt-1 flex items-end justify-between gap-2 sm:mt-3 sm:gap-4">
                  <h3 className="font-display text-xl uppercase sm:text-3xl md:text-4xl">LumiPure</h3>
                  <p className="font-display text-lg text-primary sm:text-2xl md:text-3xl">{purePrice}</p>
                </div>
                <p className="mt-3 hidden text-sm text-muted-foreground sm:block md:text-base">
                  A handheld cleansing device with a clear water tank, interchangeable
                  tips and USB charging.
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
                  <Truck className="size-3.5 shrink-0 text-primary" /> Delivery in 8–14 days
                </p>
                <BuyButton product="lumipure" className="mt-3 w-full rounded-full sm:mt-6" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <BundleOffer region={region} />

      {/* ── LumiMask: gallery + details ───────────────────────────────────── */}
      <section id="lumimask" className="border-t border-primary/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:py-24">
          <div>
            <div className="overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-card">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                width={572}
                height={1024}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
              {GALLERY.map((img, i) => (
                <button
                  key={img.alt}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show LumiMask photo ${i + 1}`}
                  aria-pressed={i === activeImage}
                  className={cn(
                    "overflow-hidden rounded-xl border-2 transition",
                    i === activeImage
                      ? "border-primary shadow-glow"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <img
                    src={img.src}
                    alt=""
                    width={572}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">LED Therapy Mask</p>
            <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">LumiMask</h2>
            <p className="mt-2 font-display text-3xl text-primary">{price}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {region.code === "US"
                ? "Price in US dollars."
                : "Approximate price converted from US$40. Your final total is shown at checkout."}
            </p>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                LumiMask is a flexible LED mask that sits close to your skin so the light reaches
                evenly across your whole face. Slip it on, choose a light mode, and let the soft
                red glow turn ten minutes into your favourite part of the day.
              </p>
              <p>
                Made from lightweight, skin-soft silicone with an adjustable strap, it stays
                comfortable whether you're reading, scrolling or simply closing your eyes.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-primary/15 bg-surface p-4">
                  <Icon className="size-5 text-primary" />
                  <p className="mt-3 font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="font-semibold text-foreground">7 light modes</p>
              <ul className="mt-4 space-y-3">
                {LIGHT_MODES.map((m) => (
                  <li key={m.name} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1 block size-4 shrink-0 rounded-full"
                      style={{ background: m.color, boxShadow: `0 0 12px 2px ${m.color}` }}
                    />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {m.name}
                        {m.nm && ` (${m.nm})`}
                      </span>{" "}
                      — {m.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <BuyButton quantity={quantity} className="w-full rounded-full sm:flex-1" />
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" /> You'll complete payment on Shopify's secure checkout.
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="size-3.5" /> Delivery in 8–14 days.
            </p>
          </div>
        </div>
      </section>

      {/* ── LumiPure: gallery + details ───────────────────────────────────── */}
      <section id="lumipure" className="border-t border-primary/10 bg-burgundy">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:py-24">
          <div>
            <div className="overflow-hidden rounded-3xl border border-primary/15 bg-surface shadow-card">
              <img
                src={currentPureImage.src}
                alt={currentPureImage.alt}
                width={572}
                height={1024}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
              {PURE_GALLERY.map((img, i) => (
                <button
                  key={img.alt}
                  type="button"
                  onClick={() => setActivePureImage(i)}
                  aria-label={`Show LumiPure photo ${i + 1}`}
                  aria-pressed={i === activePureImage}
                  className={cn(
                    "overflow-hidden rounded-xl border-2 transition",
                    i === activePureImage
                      ? "border-primary shadow-glow"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <img
                    src={img.src}
                    alt=""
                    width={572}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">LumiPure</p>
            <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">A fresh start for your skin.</h2>
            <p className="mt-4 font-display text-3xl text-primary">{purePrice}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {region.code === "US"
                ? "Price in US dollars."
                : "Approximate price converted from US$39.99. Your final total is shown at checkout."}
            </p>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                LumiPure is a handheld, water-assisted pore cleansing device designed
                for the areas around your nose, cheeks and chin. Its clear tank and
                targeted nozzle make it a simple addition to your cleansing routine.
              </p>
              <p>
                Choose an attachment, add clean water and glide gently across your skin
                with light pressure. The included USB cable makes recharging simple.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {PURE_FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-primary/15 bg-surface p-4">
                  <Icon className="size-5 text-primary" />
                  <p className="mt-3 font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-primary/15 bg-background/50 p-5">
              <p className="font-semibold">A gentle routine</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep the device moving and avoid holding it in one spot. Do not use on
                broken or irritated skin, and clean the attachments after each use.
              </p>
            </div>

            <BuyButton product="lumipure" className="mt-8 w-full rounded-full" />
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" /> You'll complete payment on Shopify's secure checkout.
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="size-3.5" /> Delivery in 8–14 days.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three steps band ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <img
            src={maskEveningAsset.url}
            alt="Relaxing on the sofa while wearing the LumiMask face mask"
            width={572}
            height={1024}
            loading="lazy"
            className="aspect-square w-full rounded-3xl border border-primary/15 object-cover shadow-card"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The ritual</p>
            <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">Three steps. Ten minutes.</h2>
            <ol className="mt-8 space-y-6">
              {[
                ["Cleanse", "Start with clean, dry skin."],
                ["Glow", "Put on LumiMask, pick a mode and press start."],
                ["Unwind", "Relax for ten minutes — it switches off on its own."],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary font-display text-lg text-primary-foreground shadow-glow">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Our technology / why people love it ───────────────────────────── */}
      <section id="love" className="border-t border-primary/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our technology</p>
          <h2 className="mt-3 text-center font-display text-4xl uppercase md:text-5xl">
            Small things that make it <span className="text-gold">stick.</span>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOVED.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="rounded-3xl border border-primary/15 bg-surface p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 font-semibold text-foreground">{title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-primary/10">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="text-center font-display text-4xl uppercase md:text-5xl">Questions, answered</h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-primary/15">
                <AccordionTrigger className="py-5 text-base hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10">
        <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <h2 className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            Ready to find your <span className="text-gold">ritual?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            LumiMask · {price} &nbsp;·&nbsp; LumiPure · {purePrice}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BuyButton label="Buy LumiMask" className="rounded-full" />
            <BuyButton product="lumipure" label="Buy LumiPure" className="rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-primary/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground md:flex-row">
          <p className="font-display text-lg uppercase tracking-[0.16em] text-foreground">LumiMask</p>
          <p>LumiMask and LumiPure are cosmetic devices and are not intended to diagnose or treat any condition.</p>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-6 text-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4 text-primary" />
            Any problem with your order? Email us at {CONTACT_EMAIL}
          </a>
        </div>
        <div className="pb-8">
          <PolicyLinks />
        </div>
      </footer>

      {/* ── Mobile sticky buy bar ─────────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/15 bg-background/90 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 gap-2 px-4 py-3">
          <BuyButton size="lg" label={`LumiMask · ${price}`} className="h-12 rounded-full px-3 text-xs" />
          <BuyButton
            product="lumipure"
            size="lg"
            label={`LumiPure · ${purePrice}`}
            className="h-12 rounded-full px-3 text-xs"
          />
        </div>
      </div>
    </div>
  );
}

function RegionSelect({ region, onChange }: { region: Region; onChange: (r: Region) => void }) {
  return (
    <label className="relative">
      <span className="sr-only">Choose your country</span>
      <select
        value={region.code}
        onChange={(e) => onChange(REGIONS.find((r) => r.code === e.target.value) ?? DEFAULT_REGION)}
        className="h-9 cursor-pointer appearance-none rounded-full border border-primary/20 bg-card/70 pl-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {REGIONS.map((r) => (
          <option key={r.code} value={r.code}>
            {r.code} · {r.currency}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
        ▾
      </span>
    </label>
  );
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex h-14 items-center justify-between rounded-full border border-primary/20 bg-card/70 px-2 sm:w-36">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-accent"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(10, value + 1))}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-accent"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
