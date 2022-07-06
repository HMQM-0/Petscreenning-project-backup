import { ICartContext } from "./context";

export const CartActionTypes = {
  INITIALIZE_CART: "INITIALIZE_CART",
  UPDATE_ITEMS: "UPDATE_ITEMS",
  CLEAR_CART: "CLEAR_CART",
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
  clearCart: () => ({
    type: CartActionTypes.CLEAR_CART,
    payload: null,
  }),
} as const;

type CartActionKeys = keyof typeof CartActionCreators;
export type CartActions = ReturnType<typeof CartActionCreators[CartActionKeys]>;
