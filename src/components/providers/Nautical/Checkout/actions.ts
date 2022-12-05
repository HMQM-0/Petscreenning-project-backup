import { ICheckoutStateContext } from "./context";
import { IPaymentModel } from "./types";

export const CheckoutActionTypes = {
  INITIALIZE_CHECKOUT: "INITIALIZE_CHECKOUT",
  UPDATE_SHIPPING_ADDRESS: "UPDATE_SHIPPING_ADDRESS",
  CREATE_CHECKOUT: "CREATE_CHECKOUT",
  SET_BILLING_ADDRESS: "SET_BILLING_ADDRESS",
  SET_BILLING_ADDRESS_WITH_EMAIL: "SET_BILLING_ADDRESS_WITH_EMAIL",
  SET_SHIPPING_METHOD: "SET_SHIPPING_METHOD",
  SET_SELLER_SHIPPING_METHODS: "SET_SELLER_SHIPPING_METHODS",
  ADD_PROMO_CODE: "ADD_PROMO_CODE",
  REMOVE_PROMO_CODE: "REMOVE_PROMO_CODE",
  CREATE_PAYMENT: "CREATE_PAYMENT",
  CLEAR_CHECKOUT: "CLEAR_CHECKOUT",
  UPDATE_LINES: "UPDATE_LINES",
} as const;

export const CheckoutActionCreators = {
  initializeCheckout: (checkout: ICheckoutStateContext) => ({
    type: CheckoutActionTypes.INITIALIZE_CHECKOUT,
    payload: {
      checkout,
    },
  }),
  updateShippingAddress: (payload: {
    availableShippingMethods: ICheckoutStateContext["availableShippingMethods"];
    billingAsShipping: ICheckoutStateContext["billingAsShipping"];
    email: string;
    selectedShippingAddressId: ICheckoutStateContext["selectedShippingAddressId"];
    shippingAddress: ICheckoutStateContext["shippingAddress"];
    availableShippingMethodsBySeller: ICheckoutStateContext["availableShippingMethodsBySeller"];
  }) => ({
    type: CheckoutActionTypes.UPDATE_SHIPPING_ADDRESS,
    payload,
  }),
  createCheckout: (payload: ICheckoutStateContext) => ({
    type: CheckoutActionTypes.CREATE_CHECKOUT,
    payload,
  }),
  setBillingAddress: (payload: {
    availablePaymentGateways: ICheckoutStateContext["availablePaymentGateways"];
    billingAddress: ICheckoutStateContext["billingAddress"];
    billingAsShipping: ICheckoutStateContext["billingAsShipping"];
    selectedBillingAddressId: ICheckoutStateContext["selectedBillingAddressId"];
  }) => ({
    type: CheckoutActionTypes.SET_BILLING_ADDRESS,
    payload,
  }),
  setBillingAddressWithEmail: (payload: {
    availablePaymentGateways: ICheckoutStateContext["availablePaymentGateways"];
    billingAddress: ICheckoutStateContext["billingAddress"];
    billingAsShipping: ICheckoutStateContext["billingAsShipping"];
    email: ICheckoutStateContext["email"];
    selectedBillingAddressId: ICheckoutStateContext["selectedBillingAddressId"];
  }) => ({
    type: CheckoutActionTypes.SET_BILLING_ADDRESS_WITH_EMAIL,
    payload,
  }),
  setShippingMethod: (payload: {
    promoCodeDiscount: ICheckoutStateContext["promoCodeDiscount"];
    shippingMethod: ICheckoutStateContext["shippingMethod"];
  }) => ({
    type: CheckoutActionTypes.SET_SHIPPING_METHOD,
    payload,
  }),
  setSellerShippingMethods: (payload: {
    lines: ICheckoutStateContext["lines"];
    promoCodeDiscount: ICheckoutStateContext["promoCodeDiscount"];
    sellerShippingMethods: ICheckoutStateContext["sellerShippingMethods"];
  }) => ({
    type: CheckoutActionTypes.SET_SELLER_SHIPPING_METHODS,
    payload,
  }),
  addPromoCode: (payload: { promoCodeDiscount: ICheckoutStateContext["promoCodeDiscount"] }) => ({
    type: CheckoutActionTypes.ADD_PROMO_CODE,
    payload,
  }),
  removePromoCode: (payload: { promoCodeDiscount: ICheckoutStateContext["promoCodeDiscount"] }) => ({
    type: CheckoutActionTypes.REMOVE_PROMO_CODE,
    payload,
  }),
  createPayment: (payment: IPaymentModel) => ({
    type: CheckoutActionTypes.CREATE_PAYMENT,
    payload: {
      payment,
    },
  }),
  clearCheckout: () => ({
    type: CheckoutActionTypes.CLEAR_CHECKOUT,
    payload: {},
  }),
  updateLines: (lines: ICheckoutStateContext["lines"], reset?: boolean) => ({
    type: CheckoutActionTypes.UPDATE_LINES,
    payload: {
      lines,
      reset,
    },
  }),
} as const;

type CheckoutActionKeys = keyof typeof CheckoutActionCreators;
export type CheckoutActions = ReturnType<typeof CheckoutActionCreators[CheckoutActionKeys]>;
