import { ICartContext } from "./context";

export const CartActionTypes = {
  INITIALIZE_CART: "INITIALIZE_CART",
  ADD_ITEM: "ADD_ITEM",
} as const;

export const CartActionCreators = {
  addItem: (items: ICartContext["items"]) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: {
      items,
    },
  }),
  initializeCart: (items: ICartContext["items"]) => ({
    type: CartActionTypes.INITIALIZE_CART,
    payload: {
      items,
    },
  }),
} as const;

type CartActionKeys = keyof typeof CartActionCreators;
export type CartActions = ReturnType<typeof CartActionCreators[CartActionKeys]>;
