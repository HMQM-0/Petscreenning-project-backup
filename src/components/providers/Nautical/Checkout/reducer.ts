import { Reducer } from "use-immer";

import { setNauticalClientSecret, setNauticalPaymentId } from "src/utils";

import { CheckoutActions, CheckoutActionTypes } from "./actions";
import { ICheckoutStateContext } from "./context";
import { CheckoutFragment } from "./fragments.graphql.generated";

const parseSellerShippingMethods = (sellerShippingMethods: CheckoutFragment["sellerShippingMethods"]) => {
  if (typeof sellerShippingMethods === "string") {
    return JSON.parse(sellerShippingMethods);
  }
  return sellerShippingMethods;
};

export const reducer: Reducer<ICheckoutStateContext, CheckoutActions> = (draft, action) => {
  switch (action.type) {
    case CheckoutActionTypes.INITIALIZE_CHECKOUT:
      draft.loaded = true;
      draft.id = action.payload.checkout?.id;
      draft.shippingAddress = action.payload.checkout.shippingAddress;
      draft.billingAddress = action.payload.checkout.billingAddress;
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
      draft.shippingMethod = action.payload.checkout.shippingMethod;
      draft.lines = action.payload.checkout.lines;
      draft.sellerShippingMethods = parseSellerShippingMethods(action.payload.checkout.sellerShippingMethods);
      draft.token = action.payload.checkout.token;
      break;
    case CheckoutActionTypes.UPDATE_SHIPPING_ADDRESS:
      draft.availableShippingMethods = action.payload.availableShippingMethods;
      draft.billingAsShipping = action.payload.billingAsShipping;
      draft.email = action.payload.email;
      draft.selectedShippingAddressId = action.payload.selectedShippingAddressId;
      draft.shippingAddress = action.payload.shippingAddress;
      draft.availableShippingMethodsBySeller = action.payload.availableShippingMethodsBySeller;
      break;
    case CheckoutActionTypes.CREATE_CHECKOUT:
      draft.id = action.payload?.id;
      draft.shippingAddress = action.payload.shippingAddress;
      draft.billingAddress = action.payload.billingAddress;
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      draft.billingAsShipping = action.payload.billingAsShipping;
      draft.selectedShippingAddressId = action.payload.selectedShippingAddressId;
      draft.selectedBillingAddressId = action.payload.selectedBillingAddressId;
      draft.availableShippingMethods = action.payload.availableShippingMethods;
      draft.availableShippingMethodsBySeller = action.payload.availableShippingMethodsBySeller;
      draft.applicableVolumeDiscounts = action.payload.applicableVolumeDiscounts;
      draft.applicableVolumeDiscountsBySeller = action.payload.applicableVolumeDiscountsBySeller;
      draft.availablePaymentGateways = action.payload.availablePaymentGateways;
      draft.payment = action.payload.payment;
      draft.email = action.payload.email;
      draft.shippingMethod = action.payload.shippingMethod;
      draft.lines = action.payload.lines;
      draft.sellerShippingMethods = parseSellerShippingMethods(action.payload.sellerShippingMethods);
      draft.token = action.payload.token;
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
      setNauticalPaymentId(null);
      draft.lines = action.payload.lines;
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      draft.sellerShippingMethods = parseSellerShippingMethods(action.payload.sellerShippingMethods);
      break;
    case CheckoutActionTypes.ADD_PROMO_CODE:
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      break;
    case CheckoutActionTypes.REMOVE_PROMO_CODE:
      draft.promoCodeDiscount = action.payload.promoCodeDiscount;
      break;
    case CheckoutActionTypes.CREATE_PAYMENT:
      draft.payment = action.payload.payment;
      break;
    case CheckoutActionTypes.CLEAR_CHECKOUT:
      setNauticalPaymentId(null);
      setNauticalClientSecret(null);
      draft.id = undefined;
      draft.email = undefined;
      draft.promoCodeDiscount = undefined;
      draft.billingAsShipping = undefined;
      draft.shippingAddress = undefined;
      draft.billingAddress = undefined;
      draft.selectedShippingAddressId = undefined;
      draft.selectedBillingAddressId = undefined;
      draft.availableShippingMethods = undefined;
      draft.availableShippingMethodsBySeller = undefined;
      draft.applicableVolumeDiscounts = undefined;
      draft.applicableVolumeDiscountsBySeller = undefined;
      draft.availablePaymentGateways = undefined;
      draft.payment = undefined;
      draft.shippingMethod = undefined;
      draft.lines = undefined;
      draft.sellerShippingMethods = undefined;
      draft.token = undefined;
      break;
    case CheckoutActionTypes.UPDATE_LINES:
      setNauticalPaymentId(null);
      setNauticalClientSecret(null);
      action.payload.lines?.forEach((updatedLine) => {
        if (draft.lines) {
          const existingLine = draft.lines?.find((line) => updatedLine.variant.id === line.variant.id);
          if (existingLine) {
            // Update existing lines
            existingLine.id = updatedLine.id;
            existingLine.quantity = updatedLine.quantity;
            existingLine.seller = updatedLine.seller;
            existingLine.totalPrice = updatedLine.totalPrice;
            existingLine.undiscountedPrice = updatedLine.undiscountedPrice;
            existingLine.variant = updatedLine.variant;
          } else {
            // add new line to lines
            draft.lines.push(updatedLine);
          }
        } else {
          // initiate lines with item
          draft.lines = [updatedLine];
        }
      });
      // Remove any lines not in the payload
      draft.lines = draft.lines?.filter((existingLine) =>
        action.payload.lines?.find((line) => line.variant.id === existingLine.variant.id),
      );
      if (action.payload.reset) {
        draft.billingAsShipping = undefined;
        draft.shippingAddress = undefined;
        draft.billingAddress = undefined;
        draft.selectedShippingAddressId = undefined;
        draft.selectedBillingAddressId = undefined;
        draft.availableShippingMethods = undefined;
        draft.availableShippingMethodsBySeller = undefined;
        draft.applicableVolumeDiscounts = undefined;
        draft.applicableVolumeDiscountsBySeller = undefined;
        draft.availablePaymentGateways = undefined;
        draft.payment = undefined;
        draft.shippingMethod = undefined;
        draft.sellerShippingMethods = undefined;
        draft.token = undefined;
        draft.id = undefined;
        draft.email = undefined;
        draft.promoCodeDiscount = undefined;
      }
      break;
    default:
      throw new Error(`Checkout Reducer had action type with no case ${action}`);
  }
};
