import { ICartContext } from "./context";

export const CartActionTypes = {
  INITIALIZE_CART: "INITIALIZE_CART",
  UPDATE_ITEMS: "UPDATE_ITEMS",
} as const;

export const CartActionCreators = {
  updateItems: (items: ICartContext["items"]) => ({
    type: CartActionTypes.UPDATE_ITEMS,
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
