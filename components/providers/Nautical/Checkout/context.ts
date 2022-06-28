import { createContext } from "react";

import { PaymentGateway } from "@generated";

import { CheckoutFragment } from "./fragments.graphql.generated";
import {
  ICheckoutModel,
  ICheckoutModelPriceValue,
  IMultiSellerVolumeDiscount,
  IPaymentModel,
  IPromoCodeDiscount,
} from "./types";

export type ICheckoutContext = {
  loaded: boolean;

  checkout?: ICheckoutModel;

  promoCodeDiscount?: IPromoCodeDiscount;

  billingAsShipping?: boolean;

  selectedShippingAddressId?: string;

  selectedBillingAddressId?: string;

  availableShippingMethods?: CheckoutFragment["availableShippingMethods"];
  availableShippingMethodsBySeller?: CheckoutFragment["availableShippingMethodsBySeller"];
  applicableVolumeDiscounts?: ICheckoutModelPriceValue;
  applicableVolumeDiscountsBySeller?: IMultiSellerVolumeDiscount[];
  availablePaymentGateways?: PaymentGateway[];

  payment?: IPaymentModel;
};

export const INITIAL_STATE: ICheckoutContext = {
  loaded: false,
};

export const CheckoutContext = createContext<ICheckoutContext>(INITIAL_STATE);
