import React from "react";
import { useImmerReducer } from "use-immer";

import { CartContext, ICartContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAddItem } from "./useAddItem";
import { useCalculateSummaryPrices } from "./useCalculateSummaryPrices";
import { useInitializeCart } from "./useInitializeCart";
import { useRemoveItem } from "./useRemoveItem";
import { useSubtractItem } from "./useSubtractItem";
import { useUpdateItem } from "./useUpdateItem";

type CartProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProps) => {
  const [cart, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  useInitializeCart({ dispatch });

  const addItem = useAddItem({ dispatch });
  const removeItem = useRemoveItem({ dispatch });
  const subtractItem = useSubtractItem({ dispatch });
  const updateItem = useUpdateItem({ dispatch });
  const { discount, shippingPrice, subtotalPrice, totalPrice } = useCalculateSummaryPrices({ items: cart.items });

  const value: ICartContext = {
    ...cart,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
    addItem,
    removeItem,
    subtractItem,
    updateItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
