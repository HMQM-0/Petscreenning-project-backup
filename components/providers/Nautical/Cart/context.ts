import { createContext } from "react";

import { IItems, ITotalPrice, ISubtotalPrice, IShippingPrice, IDiscount } from "./types";
import { useAddItem } from "./useAddItem";

export type ICartContext = {
  loaded: boolean;

  items: IItems;

  totalPrice: ITotalPrice;

  subtotalPrice: ISubtotalPrice;

  shippingPrice: IShippingPrice;

  discount?: IDiscount;

  addItem: ReturnType<typeof useAddItem>;

  removeItem: () => void;
};

export const INITIAL_STATE: ICartContext = {
  loaded: false,
  items: null,
  totalPrice: null,
  subtotalPrice: null,
  shippingPrice: null,
  addItem: async (variantId: string, quantity: number) => {},
  removeItem: () => {},
};

export const CartContext = createContext<ICartContext>(INITIAL_STATE);
