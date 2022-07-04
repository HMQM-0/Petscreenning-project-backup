import { createContext } from "react";

import { PaymentGateway } from "@generated";

import { CheckoutFragment } from "./fragments.graphql.generated";
import { ICheckoutAddress, ICheckoutModel, IPaymentModel, IPromoCodeDiscount } from "./types";
import { useSetShippingAddress } from "./useSetShippingAddress";
import { useSetBillingAddress } from "./useSetBillingAddress";
import { useSetBillingAsShippingAddress } from "./useSetBillingAsShippingAddress";
import { useSetShippingMethod } from "./useSetShippingMethod";
import { useSetSellerShippingMethods } from "./useSetSellerShippingMethods";

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
  shippingMethod?: CheckoutFragment["shippingMethod"];
  lines?: ICheckoutModel["lines"];
  sellerShippingMethods?: CheckoutFragment["sellerShippingMethods"];
  setShippingAddress: ReturnType<typeof useSetShippingAddress>;
  setBillingAddress: ReturnType<typeof useSetBillingAddress>;
  setBillingAsShippingAddress: ReturnType<typeof useSetBillingAsShippingAddress>;
  setShippingMethod: ReturnType<typeof useSetShippingMethod>;
  setSellerShippingMethods: ReturnType<typeof useSetSellerShippingMethods>;
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
  setBillingAsShippingAddress: async (billingAsShipping: boolean) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  setShippingMethod: async (shippingMethodId: string) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  setSellerShippingMethods: async (seller: number, shippingMethodSelection: string) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
};

export const CheckoutContext = createContext<ICheckoutContext>(INITIAL_STATE);
