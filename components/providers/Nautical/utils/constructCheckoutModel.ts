import { CheckoutFragment } from "../Checkout/fragments.graphql.generated";
import { ICheckoutModel } from "../Checkout/types";

export const constructCheckoutModel = ({
  id,
  token,
  email,
  shippingAddress,
  billingAddress,
  discount,
  discountName,
  voucherCode,
  lines,
  availablePaymentGateways,
  availableShippingMethods,
  availableShippingMethodsBySeller,
  applicableVolumeDiscounts,
  applicableVolumeDiscountsBySeller,
  shippingMethod,
  sellerShippingMethods,
}: CheckoutFragment): ICheckoutModel => ({
  availablePaymentGateways,
  applicableVolumeDiscounts,
  applicableVolumeDiscountsBySeller,
  availableShippingMethods: availableShippingMethods
    ? availableShippingMethods.filter((value) => value !== null && value !== undefined)
    : [],
  availableShippingMethodsBySeller: availableShippingMethodsBySeller ? availableShippingMethodsBySeller : [],
  billingAddress,
  email,
  id,
  lines: lines
    ?.filter((item) => item?.quantity && item.variant.id)
    .map((item) => {
      const itemVariant = item?.variant;

      return {
        id: item!.id,
        quantity: item!.quantity,
        seller: item?.seller?.id,
        totalPrice: item?.totalPrice,
        variant: {
          attributes: itemVariant?.attributes,
          id: itemVariant!.id,
          isAvailable: itemVariant?.isAvailable,
          name: itemVariant?.name,
          pricing: itemVariant?.pricing,
          product: itemVariant?.product,
          quantityAvailable: itemVariant?.quantityAvailable,
          sku: itemVariant?.sku,
        },
      };
    }),
  promoCodeDiscount: {
    discount,
    discountName,
    voucherCode,
  },
  sellerShippingMethods,
  shippingAddress,
  shippingMethod,
  token,
});
