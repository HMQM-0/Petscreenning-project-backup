import { useCallback } from "react";

import { getCheckout } from "src/utils";

const useItemInCart = () => {
  return useCallback((variantId: string) => {
    const checkout = getCheckout();

    const lines = checkout?.lines || [];
    const variantInCheckout = lines.find((variant) => variant.variant.id === variantId && variant.quantity > 0);
    if (variantInCheckout) {
      return true;
    }
    return false;
  }, []);
};

export { useItemInCart };
