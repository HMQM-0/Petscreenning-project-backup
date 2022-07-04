import { createContext } from "react";

import { PaymentGateway } from "@generated";

import { CheckoutFragment } from "./fragments.graphql.generated";
import { ICheckoutAddress, ICheckoutModel, IPaymentModel, IPromoCodeDiscount } from "./types";
import { useSetShippingAddress } from "./useSetShippingAddress";
import { useSetBillingAddress } from "./useSetBillingAddress";

export type ICheckoutContext = {
  loaded: boolean;
  checkout?: ICheckoutModel;
  email?: string;
  promoCodeDiscount?: IPromoCodeDiscount;
  billingAsShipping?: boolean;
  shippingAddress?: CheckoutFragment["shippingAddress"];
  billingAddress?: CheckoutFragment["billingAddress"];
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  availableShippingMethods?: CheckoutFragment["availableShippingMethods"];
  availableShippingMethodsBySeller?: CheckoutFragment["availableShippingMethodsBySeller"];
  applicableVolumeDiscounts?: CheckoutFragment["applicableVolumeDiscounts"];
  applicableVolumeDiscountsBySeller?: CheckoutFragment["applicableVolumeDiscountsBySeller"];
  availablePaymentGateways?: PaymentGateway[];
  payment?: IPaymentModel;
  setShippingAddress: ReturnType<typeof useSetShippingAddress>;
  setBillingAddress: ReturnType<typeof useSetBillingAddress>;
};

export const INITIAL_STATE: ICheckoutContext = {
  loaded: false,
  setShippingAddress: async (shippingAddress: ICheckoutAddress, email: string) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  setBillingAddress: async (billingAddress: ICheckoutAddress, email?: string) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
};

export const CheckoutContext = createContext<ICheckoutContext>(INITIAL_STATE);
