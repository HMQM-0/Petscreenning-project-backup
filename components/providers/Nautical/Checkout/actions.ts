import { ICheckoutContext } from "./context";

export const CheckoutActionTypes = {
  INITIALIZE_CHECKOUT: "INITIALIZE_CHECKOUT",
  UPDATE_SHIPPING_ADDRESS: "UPDATE_SHIPPING_ADDRESS",
} as const;

export const CheckoutActionCreators = {
  initializeCheckout: (checkout: Partial<ICheckoutContext>) => ({
    type: CheckoutActionTypes.INITIALIZE_CHECKOUT,
    payload: {
      checkout,
    },
  }),
  updateShippingAddress: (payload: {
    availableShippingMethods: ICheckoutContext["availableShippingMethods"];
    billingAsShipping: ICheckoutContext["billingAsShipping"];
    email: string;
    selectedShippingAddressId: ICheckoutContext["selectedShippingAddressId"];
    shippingAddress: ICheckoutContext["shippingAddress"];
  }) => ({
    type: CheckoutActionTypes.UPDATE_SHIPPING_ADDRESS,
    payload,
  }),
} as const;

type CheckoutActionKeys = keyof typeof CheckoutActionCreators;
export type CheckoutActions = ReturnType<typeof CheckoutActionCreators[CheckoutActionKeys]>;
