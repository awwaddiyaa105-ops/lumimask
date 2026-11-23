/**
 * LumiMask store settings.
 * Buy buttons send shoppers to Shopify's hosted checkout (cart permalink).
 * No payment details are ever collected on this site.
 */

/** Shopify store address, e.g. "your-store.myshopify.com". Empty = checkout not connected yet. */
export const SHOPIFY_STORE_DOMAIN = "s1ivi3-qt.myshopify.com";

/** Shopify variant IDs (not product IDs). */
export const LUMIMASK_VARIANT_ID = "46589980868652";
export const LUMIPURE_VARIANT_ID = "46672948428844";

/** Owner-supplied hosted Shopify checkout for LumiPure. */
export const LUMIPURE_CHECKOUT_URL =
  "https://s1ivi3-qt.myshopify.com/checkouts/cn/hWNJ8FziJEjxgEsZitfS7sKh/en-us?_r=AQABsY6ydhIl0jxAXsnvLB9i2LmNTgqXLOfZi1-n_ARSPszbS14m&cart_link_id=0mEvxcc2";

/** Leave empty for an automatic Shopify discount; set a code here if Shopify requires one. */
export const BUNDLE_DISCOUNT_CODE = "";

export type StoreProduct = "lumimask" | "lumipure" | "bundle";
export type PriceProduct = StoreProduct | "bundle-compare";

function normalizeStoreDomain(storeDomain: string) {
  return storeDomain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
}

export function buildCheckoutUrl(
  storeDomain: string,
  variantId: string,
  quantity = 1,
): string | null {
  const domain = normalizeStoreDomain(storeDomain);
  if (!domain || !/^\d+$/.test(variantId)) return null;
  const qty = Math.max(1, Math.floor(quantity));
  return `https://${domain}/cart/${variantId}:${qty}`;
}

export function buildBundleCheckoutUrl(
  storeDomain: string,
  quantity = 1,
  discountCode = BUNDLE_DISCOUNT_CODE,
): string | null {
  const domain = normalizeStoreDomain(storeDomain);
  if (!domain) return null;
  const qty = Math.max(1, Math.floor(quantity));
  const items = `${LUMIMASK_VARIANT_ID}:${qty},${LUMIPURE_VARIANT_ID}:${qty}`;
  const code = discountCode.trim();
  const discountQuery = code ? `?discount=${encodeURIComponent(code)}` : "";
  return `https://${domain}/cart/${items}${discountQuery}`;
}

export function getCheckoutUrl(quantity = 1, product: StoreProduct = "lumimask") {
  if (product === "lumipure") return LUMIPURE_CHECKOUT_URL;
  if (product === "bundle") return buildBundleCheckoutUrl(SHOPIFY_STORE_DOMAIN, quantity);
  return buildCheckoutUrl(SHOPIFY_STORE_DOMAIN, LUMIMASK_VARIANT_ID, quantity);
}

export type Region = {
  code: string;
  label: string;
  currency: string;
  amount: number;
};

export const DEFAULT_REGION: Region = {
  code: "US",
  label: "United States",
  currency: "USD",
  amount: 40,
};

/** Base price is US$40. Other regions are approximate conversions for display only. */
export const REGIONS: Region[] = [
  DEFAULT_REGION,
  { code: "ES", label: "Spain", currency: "EUR", amount: 35 },
  { code: "FR", label: "France", currency: "EUR", amount: 35 },
  { code: "GB", label: "United Kingdom", currency: "GBP", amount: 30 },
  { code: "CA", label: "Canada", currency: "CAD", amount: 56 },
];

/** LumiPure is US$39.99; other regions are approximate conversions for display only. */
export const LUMIPURE_REGIONS: Region[] = [
  { ...DEFAULT_REGION, amount: 39.99 },
  { code: "ES", label: "Spain", currency: "EUR", amount: 35 },
  { code: "FR", label: "France", currency: "EUR", amount: 35 },
  { code: "GB", label: "United Kingdom", currency: "GBP", amount: 30 },
  { code: "CA", label: "Canada", currency: "CAD", amount: 56 },
];

/** The bundle is US$60: LumiMask plus LumiPure with 50% off LumiPure. */
export const BUNDLE_REGIONS: Region[] = [
  { ...DEFAULT_REGION, amount: 60 },
  { code: "ES", label: "Spain", currency: "EUR", amount: 53 },
  { code: "FR", label: "France", currency: "EUR", amount: 53 },
  { code: "GB", label: "United Kingdom", currency: "GBP", amount: 45 },
  { code: "CA", label: "Canada", currency: "CAD", amount: 84 },
];

/** Approximate combined individual prices before the bundle discount. */
export const BUNDLE_COMPARE_AT_REGIONS: Region[] = [
  { ...DEFAULT_REGION, amount: 80 },
  { code: "ES", label: "Spain", currency: "EUR", amount: 70 },
  { code: "FR", label: "France", currency: "EUR", amount: 70 },
  { code: "GB", label: "United Kingdom", currency: "GBP", amount: 60 },
  { code: "CA", label: "Canada", currency: "CAD", amount: 112 },
];

const LOCALES: Record<string, string> = {
  US: "en-US",
  ES: "es-ES",
  FR: "fr-FR",
  GB: "en-GB",
  CA: "en-CA",
};

export function formatPrice(region: Region, product: PriceProduct = "lumimask") {
  const regions =
    product === "lumipure"
      ? LUMIPURE_REGIONS
      : product === "bundle"
        ? BUNDLE_REGIONS
        : BUNDLE_COMPARE_AT_REGIONS;
  const selectedRegion =
    product === "lumimask"
      ? region
      : (regions.find((r) => r.code === region.code) ?? regions[0]!);
  const hasCents = selectedRegion.amount % 1 !== 0;

  return new Intl.NumberFormat(LOCALES[selectedRegion.code] ?? "en-US", {
    style: "currency",
    currency: selectedRegion.currency,
    currencyDisplay: selectedRegion.code === "CA" ? "narrowSymbol" : "symbol",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(selectedRegion.amount);
}
