import { Reducer } from "use-immer";

import { CheckoutActions, CheckoutActionTypes } from "./actions";
import { ICheckoutContext } from "./context";

export const reducer: Reducer<ICheckoutContext, CheckoutActions> = (draft, action) => {
  switch (action.type) {
    case CheckoutActionTypes.INITIALIZE_CHECKOUT:
      draft.loaded = true;
      draft.checkout = action.payload.checkout;
      draft.promoCodeDiscount = action.payload.checkout?.promoCodeDiscount;
      draft.billingAsShipping = action.payload.checkout?.billingAsShipping;
      draft.selectedShippingAddressId = action.payload.checkout?.selectedShippingAddressId;
      draft.selectedBillingAddressId = action.payload.checkout?.selectedBillingAddressId;
      draft.availableShippingMethods = action.payload.checkout?.availableShippingMethods;
      draft.availableShippingMethodsBySeller = action.payload.checkout?.availableShippingMethodsBySeller;
      draft.applicableVolumeDiscounts = action.payload.checkout?.applicableVolumeDiscounts;
      draft.applicableVolumeDiscountsBySeller = action.payload.checkout?.applicableVolumeDiscountsBySeller;
      draft.availablePaymentGateways = action.payload.checkout?.availablePaymentGateways;
      draft.payment = action.payload.checkout?.payment;
      draft.email = action.payload.checkout?.email;
      break;
    case CheckoutActionTypes.UPDATE_SHIPPING_ADDRESS:
      draft.availableShippingMethods = action.payload.availableShippingMethods;
      draft.billingAsShipping = action.payload.billingAsShipping;
      draft.email = action.payload.email;
      draft.selectedShippingAddressId = action.payload.selectedShippingAddressId;
      draft.shippingAddress = action.payload.shippingAddress;
      break;
    case CheckoutActionTypes.CREATE_CHECKOUT:
      draft.checkout = action.payload.checkout;
      draft.email = action.payload.email;
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      draft.billingAsShipping = action.payload.billingAsShipping;
      draft.shippingAddress = action.payload.shippingAddress;
      draft.selectedShippingAddressId = action.payload.selectedShippingAddressId;
      draft.selectedBillingAddressId = action.payload.selectedBillingAddressId;
      draft.availableShippingMethods = action.payload.availableShippingMethods;
      draft.availableShippingMethodsBySeller = action.payload.availableShippingMethodsBySeller;
      draft.applicableVolumeDiscounts = action.payload.applicableVolumeDiscounts;
      draft.applicableVolumeDiscountsBySeller = action.payload.applicableVolumeDiscountsBySeller;
      draft.availablePaymentGateways = action.payload.availablePaymentGateways;
      draft.payment = action.payload.payment;
      break;
    case CheckoutActionTypes.SET_BILLING_ADDRESS:
      draft.availablePaymentGateways = action.payload.availablePaymentGateways;
      draft.billingAddress = action.payload.billingAddress;
      draft.billingAsShipping = action.payload.billingAsShipping;
      draft.selectedBillingAddressId = action.payload.selectedBillingAddressId;
      break;
    case CheckoutActionTypes.SET_BILLING_ADDRESS_WITH_EMAIL:
      draft.availablePaymentGateways = action.payload.availablePaymentGateways;
      draft.billingAddress = action.payload.billingAddress;
      draft.billingAsShipping = action.payload.billingAsShipping;
      draft.email = action.payload.email;
      draft.selectedBillingAddressId = action.payload.selectedBillingAddressId;
      break;
    case CheckoutActionTypes.SET_SHIPPING_METHOD:
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      draft.shippingMethod = action.payload.shippingMethod;
      break;
    case CheckoutActionTypes.SET_SELLER_SHIPPING_METHODS:
      draft.lines = action.payload.lines;
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      draft.sellerShippingMethods = action.payload.sellerShippingMethods;
      break;
    case CheckoutActionTypes.ADD_PROMO_CODE:
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      break;
    default:
      throw new Error(`Checkout Reducer had action type with no case ${action}`);
  }
};
