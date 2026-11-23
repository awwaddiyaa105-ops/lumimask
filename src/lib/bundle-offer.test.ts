import { describe, expect, it } from "vitest";

import {
  BUNDLE_OFFER_END_ISO,
  BUNDLE_OFFER_END_MS,
  BUNDLE_OFFER_START_ISO,
  BUNDLE_OFFER_START_MS,
  getBundleCountdown,
  getBundleOfferCopy,
  getBundleOfferPhase,
} from "./bundle-offer";

describe("LumiMask + LumiPure bundle offer", () => {
  it("starts November 14 at 4:00 PM Saudi time", () => {
    expect(BUNDLE_OFFER_START_ISO).toBe("2026-11-14T13:00:00.000Z");
    expect(getBundleOfferPhase(BUNDLE_OFFER_START_MS - 1)).toBe("upcoming");
    expect(getBundleOfferPhase(BUNDLE_OFFER_START_MS)).toBe("active");
  });

  it("ends November 21 at 4:00 PM Saudi time", () => {
    expect(BUNDLE_OFFER_END_ISO).toBe("2026-11-21T13:00:00.000Z");
    expect(getBundleOfferPhase(BUNDLE_OFFER_END_MS - 1)).toBe("active");
    expect(getBundleOfferPhase(BUNDLE_OFFER_END_MS)).toBe("ended");
  });

  it("counts down to the active offer deadline", () => {
    expect(getBundleCountdown(BUNDLE_OFFER_START_MS, BUNDLE_OFFER_END_MS)).toEqual({
      days: 7,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("shows 8:00 AM Eastern Time for the United States", () => {
    const copy = getBundleOfferCopy("US");
    expect(copy.starts).toBe("Starts November 14 at 8:00 AM Eastern Time");
    expect(copy.ends).toBe("Ends November 21 at 8:00 AM Eastern Time");
    expect(copy.availableAt).toBe("Available at 8:00 AM ET");
  });

  it("shows 8:00 AM Eastern Time for Canada", () => {
    const copy = getBundleOfferCopy("CA");
    expect(copy.starts).toBe("Starts November 14 at 8:00 AM Eastern Time");
    expect(copy.ends).toBe("Ends November 21 at 8:00 AM Eastern Time");
  });

  it("shows 1:00 PM UK time for the United Kingdom", () => {
    const copy = getBundleOfferCopy("GB");
    expect(copy.starts).toBe("Starts November 14 at 1:00 PM UK time");
    expect(copy.ends).toBe("Ends November 21 at 1:00 PM UK time");
  });

  it("shows 2:00 PM Central European Time for Spain", () => {
    const copy = getBundleOfferCopy("ES");
    expect(copy.starts).toBe("Starts November 14 at 2:00 PM Central European Time");
    expect(copy.ends).toBe("Ends November 21 at 2:00 PM Central European Time");
  });

  it("shows 2:00 PM Central European Time for France", () => {
    const copy = getBundleOfferCopy("FR");
    expect(copy.starts).toBe("Starts November 14 at 2:00 PM Central European Time");
    expect(copy.ends).toBe("Ends November 21 at 2:00 PM Central European Time");
  });
});
