import { ICheckoutContext } from "./context";
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
  removePromoCode: (payload: { promoCodeDiscount: ICheckoutContext["promoCodeDiscount"] }) => ({
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
} as const;

type CheckoutActionKeys = keyof typeof CheckoutActionCreators;
export type CheckoutActions = ReturnType<typeof CheckoutActionCreators[CheckoutActionKeys]>;
