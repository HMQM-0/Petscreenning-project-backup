import { ICheckoutContext } from "./context";

export const CheckoutActionTypes = {
  INITIALIZE_CHECKOUT: "INITIALIZE_CHECKOUT",
  UPDATE_SHIPPING_ADDRESS: "UPDATE_SHIPPING_ADDRESS",
  CREATE_CHECKOUT: "CREATE_CHECKOUT",
  SET_BILLING_ADDRESS: "SET_BILLING_ADDRESS",
  SET_BILLING_ADDRESS_WITH_EMAIL: "SET_BILLING_ADDRESS_WITH_EMAIL",
  SET_SHIPPING_METHOD: "SET_SHIPPING_METHOD",
  SET_SELLER_SHIPPING_METHODS: "SET_SELLER_SHIPPING_METHODS",
  ADD_PROMO_CODE: "ADD_PROMO_CODE",
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
  createCheckout: (payload: Partial<ICheckoutContext>) => ({
    type: CheckoutActionTypes.CREATE_CHECKOUT,
    payload,
  }),
  setBillingAddress: (payload: {
    availablePaymentGateways: ICheckoutContext["availablePaymentGateways"];
    billingAddress: ICheckoutContext["billingAddress"];
    billingAsShipping: ICheckoutContext["billingAsShipping"];
    selectedBillingAddressId: ICheckoutContext["selectedBillingAddressId"];
  }) => ({
    type: CheckoutActionTypes.SET_BILLING_ADDRESS,
    payload,
  }),
  setBillingAddressWithEmail: (payload: {
    availablePaymentGateways: ICheckoutContext["availablePaymentGateways"];
    billingAddress: ICheckoutContext["billingAddress"];
    billingAsShipping: ICheckoutContext["billingAsShipping"];
    email: ICheckoutContext["email"];
    selectedBillingAddressId: ICheckoutContext["selectedBillingAddressId"];
  }) => ({
    type: CheckoutActionTypes.SET_BILLING_ADDRESS_WITH_EMAIL,
    payload,
  }),
  setShippingMethod: (payload: {
    promoCodeDiscount: ICheckoutContext["promoCodeDiscount"];
    shippingMethod: ICheckoutContext["shippingMethod"];
  }) => ({
    type: CheckoutActionTypes.SET_SHIPPING_METHOD,
    payload,
  }),
  setSellerShippingMethods: (payload: {
    lines: ICheckoutContext["lines"];
    promoCodeDiscount: ICheckoutContext["promoCodeDiscount"];
    sellerShippingMethods: ICheckoutContext["sellerShippingMethods"];
  }) => ({
    type: CheckoutActionTypes.SET_SELLER_SHIPPING_METHODS,
    payload,
  }),
  addPromoCode: (payload: { promoCodeDiscount: ICheckoutContext["promoCodeDiscount"] }) => ({
    type: CheckoutActionTypes.ADD_PROMO_CODE,
    payload,
  }),
} as const;

type CheckoutActionKeys = keyof typeof CheckoutActionCreators;
export type CheckoutActions = ReturnType<typeof CheckoutActionCreators[CheckoutActionKeys]>;
