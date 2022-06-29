import { createContext } from "react";

import { IItems, ITotalPrice, ISubtotalPrice, IShippingPrice, IDiscount } from "./types";
import { useAddItem } from "./useAddItem";
import { useItemInCart } from "./useItemInCart";
import { useRemoveItem } from "./useRemoveItem";
import { useSubtractItem } from "./useSubtractItem";
import { useUpdateItem } from "./useUpdateItem";

export type ICartContext = {
  loaded: boolean;

  items: IItems;

  totalPrice: ITotalPrice;

  subtotalPrice: ISubtotalPrice;

  shippingPrice: IShippingPrice;

  discount?: IDiscount;

  addItem: ReturnType<typeof useAddItem>;

  removeItem: ReturnType<typeof useRemoveItem>;

  subtractItem: ReturnType<typeof useSubtractItem>;

  updateItem: ReturnType<typeof useUpdateItem>;

  itemInCart: ReturnType<typeof useItemInCart>;
};

export const INITIAL_STATE: ICartContext = {
  loaded: false,
  items: null,
  totalPrice: null,
  subtotalPrice: null,
  shippingPrice: null,
  addItem: async () => {},
  removeItem: async () => {},
  subtractItem: async () => {},
  updateItem: async () => {},
  itemInCart: () => false,
};

export const CartContext = createContext<ICartContext>(INITIAL_STATE);
