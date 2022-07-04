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
    default:
      throw new Error(`Checkout Reducer had action type with no case ${action}`);
  }
};
