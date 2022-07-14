import { useMemo } from "react";
import { round } from "lodash";

import { INauticalStateSummaryPrices } from "./types";

import { useCheckout } from "../Checkout";
import { ICheckoutStateContext } from "../Checkout/context";

export function calculateSummaryPrices(checkout: ICheckoutStateContext): INauticalStateSummaryPrices {
  const items = checkout?.lines;
  const shippingMethod = checkout?.shippingMethod;
  const promoCodeDiscount = checkout?.promoCodeDiscount?.discount;

  const volumeDiscount = checkout?.applicableVolumeDiscounts;

  const sellerShippingMethods = checkout?.sellerShippingMethods;

  const sellerMethods = sellerShippingMethods
    ? // @ts-ignore
      JSON.parse(sellerShippingMethods)
    : null;
  let totalShippingPrice = 0.0;
  if (sellerMethods) {
    totalShippingPrice = sellerMethods
      // @ts-ignore
      .map((method) => method.shippingMethod.price)
      // @ts-ignore
      .reduce((a, b) => parseFloat(a) + parseFloat(b), 0.0);
  }

  if (items && items.length) {
    const firstItemTotalPrice = items[0].totalPrice;

    if (firstItemTotalPrice) {
      const shippingPrice = {
        ...shippingMethod?.price,
        amount: totalShippingPrice || 0,
        currency: shippingMethod?.price?.currency || firstItemTotalPrice.gross.currency,
      };

      const itemsNetPrice = items.reduce(
        (accumulatorPrice, line) => accumulatorPrice + (line.totalPrice?.net.amount || 0),
        0
      );
      const itemsGrossPrice = items.reduce(
        (accumulatorPrice, line) => accumulatorPrice + (line.totalPrice?.gross?.amount || 0),
        0
      );

      const subtotalPrice = {
        ...firstItemTotalPrice,
        gross: {
          ...firstItemTotalPrice.gross,
          amount: round(itemsGrossPrice, 2),
        },
        net: {
          ...firstItemTotalPrice.net,
          amount: round(itemsNetPrice, 2),
        },
      };

      const discount = {
        ...promoCodeDiscount,
        amount: promoCodeDiscount?.amount || 0,
        currency: promoCodeDiscount?.currency || firstItemTotalPrice.gross.currency,
      };

      const volDiscount = volumeDiscount?.amount || 0.0;

      const totalPrice = {
        ...subtotalPrice,
        gross: {
          ...subtotalPrice.gross,
          amount: round(
            // itemsGrossPrice + shippingPrice.amount - discount.amount,
            itemsGrossPrice + totalShippingPrice - discount.amount - volDiscount,
            2
          ),
        },
        net: {
          ...subtotalPrice.net,
          amount: round(
            // itemsNetPrice + shippingPrice.amount - discount.amount,
            itemsNetPrice + totalShippingPrice - discount.amount - volDiscount,
            2
          ),
        },
      };

      return {
        discount,
        shippingPrice,
        subtotalPrice,
        totalPrice,
      };
    }
  }
  return {};
}

const useCalculateSummaryPrices = () => {
  const checkout = useCheckout();
  return useMemo(() => {
    return calculateSummaryPrices(checkout);
  }, [checkout]);
};

export { useCalculateSummaryPrices };
