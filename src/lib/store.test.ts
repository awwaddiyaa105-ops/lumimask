import { describe, expect, it } from "vitest";

import {
  LUMIMASK_VARIANT_ID,
  BUNDLE_REGIONS,
  LUMIPURE_CHECKOUT_URL,
  LUMIPURE_REGIONS,
  REGIONS,
  buildBundleCheckoutUrl,
  buildCheckoutUrl,
  getCheckoutUrl,
} from "./store";

describe("LumiMask checkout link", () => {
  it("uses the variant ID in a Shopify cart link", () => {
    expect(buildCheckoutUrl("lumimask.myshopify.com", LUMIMASK_VARIANT_ID, 1)).toBe(
      "https://lumimask.myshopify.com/cart/46589980868652:1",
    );
  });

  it("carries the chosen quantity", () => {
    expect(buildCheckoutUrl("lumimask.myshopify.com", "46589980868652", 3)).toBe(
      "https://lumimask.myshopify.com/cart/46589980868652:3",
    );
  });

  it("is not connected until a store address is set", () => {
    expect(buildCheckoutUrl("", "46589980868652", 1)).toBeNull();
  });

  it("opens the owner's Shopify checkout", () => {
    expect(getCheckoutUrl()).toBe("https://s1ivi3-qt.myshopify.com/cart/46589980868652:1");
  });

  it("opens the owner-supplied LumiPure checkout", () => {
    expect(getCheckoutUrl(1, "lumipure")).toBe(LUMIPURE_CHECKOUT_URL);
  });

  it("adds one LumiMask and one LumiPure to the same Shopify cart", () => {
    expect(buildBundleCheckoutUrl("lumimask.myshopify.com")).toBe(
      "https://lumimask.myshopify.com/cart/46589980868652:1,46672948428844:1",
    );
    expect(getCheckoutUrl(1, "bundle")).toBe(
      "https://s1ivi3-qt.myshopify.com/cart/46589980868652:1,46672948428844:1",
    );
  });

  it("carries a Shopify discount code when one is configured", () => {
    expect(buildBundleCheckoutUrl("lumimask.myshopify.com", 1, "GLOW TOGETHER")).toBe(
      "https://lumimask.myshopify.com/cart/46589980868652:1,46672948428844:1?discount=GLOW%20TOGETHER",
    );
  });
});

describe("LumiMask price", () => {
  it("is US$40 in the United States", () => {
    expect(REGIONS.find((r) => r.code === "US")).toMatchObject({ currency: "USD", amount: 40 });
  });

  it("shows prices for Spain, France, UK and Canada", () => {
    expect(REGIONS.map((r) => r.code).sort()).toEqual(["CA", "ES", "FR", "GB", "US"]);
  });

  it("prices LumiPure at US$39.99 in the United States", () => {
    expect(LUMIPURE_REGIONS.find((r) => r.code === "US")).toMatchObject({
      currency: "USD",
      amount: 39.99,
    });
  });

  it("prices the LumiMask + LumiPure bundle at US$60", () => {
    expect(BUNDLE_REGIONS.find((r) => r.code === "US")).toMatchObject({
      currency: "USD",
      amount: 60,
    });
  });

  it("gives 50% off the US$39.99 LumiPure in the US$60 bundle", () => {
    const mask = REGIONS.find((r) => r.code === "US")!.amount;
    const pure = LUMIPURE_REGIONS.find((r) => r.code === "US")!.amount;
    const bundle = BUNDLE_REGIONS.find((r) => r.code === "US")!.amount;
    expect(bundle).toBeCloseTo(mask + pure / 2, 2);
  });
});
