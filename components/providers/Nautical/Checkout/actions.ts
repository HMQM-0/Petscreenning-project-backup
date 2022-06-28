import { ICheckoutContext } from "./context";

export const CheckoutActionTypes = {
  INITIALIZE_Checkout: "INITIALIZE_Checkout",
} as const;

export const CheckoutActionCreators = {
  initializeCheckout: () => ({
    type: CheckoutActionTypes.INITIALIZE_Checkout,
    payload: {},
  }),
} as const;

type CheckoutActionKeys = keyof typeof CheckoutActionCreators;
export type CheckoutActions = ReturnType<typeof CheckoutActionCreators[CheckoutActionKeys]>;
