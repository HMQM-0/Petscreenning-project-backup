import React from "react";
import { useImmerReducer } from "use-immer";

import { CartContext, ICartContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAddItem } from "./useAddItem";
import { useCalculateSummaryPrices } from "./useCalculateSummaryPrices";
import { useInitializeCart } from "./useInitializeCart";
import { useItemInCart } from "./useItemInCart";
import { useOnSignOut } from "./useOnSignOut";
import { useRemoveItem } from "./useRemoveItem";
import { useSubtractItem } from "./useSubtractItem";
import { useUpdateItem } from "./useUpdateItem";

type CartProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProps) => {
  const [cart, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  useInitializeCart({ dispatch });
  useOnSignOut({ dispatch });
  const addItem = useAddItem({ dispatch });
  const removeItem = useRemoveItem({ dispatch });
  const subtractItem = useSubtractItem({ dispatch });
  const updateItem = useUpdateItem({ dispatch });
  const itemInCart = useItemInCart();
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
    itemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
