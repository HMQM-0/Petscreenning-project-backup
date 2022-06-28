import { createContext } from "react";

import { IItems, ITotalPrice, ISubtotalPrice, IShippingPrice, IDiscount } from "./types";
import { useAddItem } from "./useAddItem";
import { useRemoveItem } from "./useRemoveItem";

export type ICartContext = {
  loaded: boolean;

  items: IItems;

  totalPrice: ITotalPrice;

  subtotalPrice: ISubtotalPrice;

  shippingPrice: IShippingPrice;

  discount?: IDiscount;

  addItem: ReturnType<typeof useAddItem>;

  removeItem: ReturnType<typeof useRemoveItem>;
};

export const INITIAL_STATE: ICartContext = {
  loaded: false,
  items: null,
  totalPrice: null,
  subtotalPrice: null,
  shippingPrice: null,
  addItem: async () => {},
  removeItem: async () => {},
};

export const CartContext = createContext<ICartContext>(INITIAL_STATE);
