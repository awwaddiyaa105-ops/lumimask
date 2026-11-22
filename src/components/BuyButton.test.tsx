import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BuyButton } from "@/components/BuyButton";

describe("BuyButton", () => {
  afterEach(cleanup);

  it("opens the owner's Shopify checkout in a new tab so store music keeps playing", () => {
    render(<BuyButton />);

    const link = screen.getByRole("link", { name: /buy now/i });
    expect(link).toHaveAttribute(
      "href",
      "https://s1ivi3-qt.myshopify.com/cart/46589980868652:1",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
