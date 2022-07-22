import React, { useState } from "react";

import { CartContext, ICartContext } from "./context";
import { useAddItem } from "./useAddItem";
import { useCalculateSummaryPrices } from "./useCalculateSummaryPrices";
import { useInitializeCart } from "./useInitializeCart";
import { useItemInCart } from "./useItemInCart";
import { useRemoveItem } from "./useRemoveItem";
import { useSubtractItem } from "./useSubtractItem";
import { useUpdateItem } from "./useUpdateItem";

import { useCheckout } from "../Checkout";

type CartProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProps) => {
  const [loaded, setLoaded] = useState(false);
  const { lines: items } = useCheckout();

  useInitializeCart({ items, loaded, setLoaded });
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const subtractItem = useSubtractItem();
  const updateItem = useUpdateItem();
  const itemInCart = useItemInCart();
  const { discount, shippingPrice, subtotalPrice, totalPrice } = useCalculateSummaryPrices();

  const value: ICartContext = {
    items,
    loaded,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
    addItem,
    removeItem,
    subtractItem,
    updateItem,
    itemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
