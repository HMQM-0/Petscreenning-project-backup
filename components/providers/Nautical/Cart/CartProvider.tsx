import React from "react";
import { useImmerReducer } from "use-immer";

import { CartContext, ICartContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAddItem } from "./useAddItem";
import { useCalculateSummaryPrices } from "./useCalculateSummaryPrices";
import { useGetRefreshedCheckoutLines } from "./useGetRefreshedCheckoutLines";
import { useInitializeCart } from "./useInitializeCart";
import { useRemoveItem } from "./useRemoveItem";

type CartProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProps) => {
  const [cart, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  useInitializeCart({ dispatch });

  const addItem = useAddItem({ dispatch });
  const removeItem = useRemoveItem({ dispatch });
  const { discount, shippingPrice, subtotalPrice, totalPrice } = useCalculateSummaryPrices({ items: cart.items });

  const value: ICartContext = {
    ...cart,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
