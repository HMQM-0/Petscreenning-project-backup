import { createContext } from "react";

import { PaymentGateway } from "@generated";

import { CheckoutFragment } from "./fragments.graphql.generated";
import { ICheckoutAddress, ICheckoutModel, IPaymentModel } from "./types";
import { useSetShippingAddress } from "./useSetShippingAddress";
import { useSetBillingAddress } from "./useSetBillingAddress";
import { useSetBillingAsShippingAddress } from "./useSetBillingAsShippingAddress";
import { useSetShippingMethod } from "./useSetShippingMethod";
import { useSetSellerShippingMethods } from "./useSetSellerShippingMethods";
import { useAddPromoCode } from "./useAddPromoCode";
import { useRemovePromoCode } from "./useRemovePromoCode";
import { CreatePaymentInput, useCreatePayment } from "./useCreatePayment";
import { CompleteCheckoutInput, useCompleteCheckout } from "./useCompleteCheckout";
import { useUpdateLines } from "./useUpdateLines";

export type ICheckoutContext = {
  loaded: boolean;
  id?: ICheckoutModel["id"];
  email?: string;
  promoCodeDiscount?: ICheckoutModel["promoCodeDiscount"];
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
  addPromoCode: ReturnType<typeof useAddPromoCode>;
  removePromoCode: ReturnType<typeof useRemovePromoCode>;
  createPayment: ReturnType<typeof useCreatePayment>;
  completeCheckout: ReturnType<typeof useCompleteCheckout>;
  updateLines: ReturnType<typeof useUpdateLines>;
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
  addPromoCode: async (promoCode: string) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  removePromoCode: async (promoCode: string) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  createPayment: async (input: CreatePaymentInput) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  completeCheckout: async (input?: CompleteCheckoutInput) => ({
    data: undefined,
    dataError: undefined,
    pending: false,
  }),
  updateLines: (lines: ICheckoutContext["lines"]) => {},
};

export const CheckoutContext = createContext<ICheckoutContext>(INITIAL_STATE);
