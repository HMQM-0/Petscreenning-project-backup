import React from "react";
import { useImmerReducer } from "use-immer";

import { CartContext, ICartContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAddItem } from "./useAddItem";
import { useGetRefreshedCheckoutLines } from "./useGetRefreshedCheckoutLines";
import { useInitializeCart } from "./useInitializeCart";

type CartProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartProps) => {
  const [cart, dispatch] = useImmerReducer(reducer, INITIAL_STATE);
  const getRefreshedCheckoutLines = useGetRefreshedCheckoutLines();

  useInitializeCart({ dispatch, getRefreshedCheckoutLines });

  const addItem = useAddItem({ getRefreshedCheckoutLines, dispatch });

  const value: ICartContext = {
    ...cart,
    addItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
