import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BundleOffer } from "@/components/BundleOffer";
import { BUNDLE_OFFER_START_MS } from "@/lib/bundle-offer";
import { DEFAULT_REGION, REGIONS, type Region } from "@/lib/store";

function renderAt(nowMs: number, region: Region = DEFAULT_REGION) {
  const spy = vi.spyOn(Date, "now").mockReturnValue(nowMs);
  const result = render(<BundleOffer region={region} />);
  return { ...result, spy };
}

describe("bundle offer regional wording", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("shows the US offer end in Eastern Time while live", () => {
    const { container } = renderAt(BUNDLE_OFFER_START_MS + 3_600_000);
    expect(container.textContent).not.toMatch(/saudi|gmt|utc/i);
    expect(screen.getByText("Ends November 21 at 8:00 AM Eastern Time")).toBeInTheDocument();
    expect(screen.getByText("Offer times for United States · Eastern Time")).toBeInTheDocument();
    expect(screen.getByText("Time left")).toBeInTheDocument();
  });

  it("shows the US offer start and button in Eastern Time", () => {
    renderAt(BUNDLE_OFFER_START_MS - 3_600_000);
    expect(screen.getByText("Starts November 14 at 8:00 AM Eastern Time")).toBeInTheDocument();
    expect(screen.getByText("Available at 8:00 AM ET")).toBeInTheDocument();
  });

  it("changes the displayed deadline when the UK region is selected", () => {
    const uk = REGIONS.find((region) => region.code === "GB")!;
    renderAt(BUNDLE_OFFER_START_MS + 3_600_000, uk);
    expect(screen.getByText("Ends November 21 at 1:00 PM UK time")).toBeInTheDocument();
    expect(screen.getByText("Offer times for United Kingdom · UK time")).toBeInTheDocument();
  });

  it("names the offer The Black Friday Deal", () => {
    const { container } = renderAt(BUNDLE_OFFER_START_MS + 3_600_000);
    expect(screen.getAllByText(/the black friday deal/i).length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/one-week bundle offer/i);
  });

  it("sends the Buy both button to the Shopify cart with both products", () => {
    renderAt(BUNDLE_OFFER_START_MS + 3_600_000);
    const link = screen.getByRole("link", { name: /buy both/i });
    expect(link).toHaveAttribute(
      "href",
      "https://s1ivi3-qt.myshopify.com/cart/46589980868652:1,46672948428844:1",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
