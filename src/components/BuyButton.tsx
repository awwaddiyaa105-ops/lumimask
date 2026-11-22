import { ShoppingBag } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { getCheckoutUrl, type StoreProduct } from "@/lib/store";

type BuyButtonProps = {
  product?: StoreProduct;
  quantity?: number;
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
};

export function BuyButton({
  product = "lumimask",
  quantity = 1,
  size = "xl",
  className,
  label = "Buy now",
}: BuyButtonProps) {
  const url = getCheckoutUrl(quantity, product);

  if (url) {
    return (
      <Button asChild variant="glow" size={size} className={className}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ShoppingBag />
          {label}
        </a>
      </Button>
    );
  }

  return (
    <Button variant="glow" size={size} className={className} disabled>
      <ShoppingBag />
      {label}
    </Button>
  );
}
