import { getCheckout, setCheckout } from "utils";

import { UpdateCheckoutLineMutation } from "../Checkout/mutations.graphql.generated";

export const saveMutationResultToLocalStorage = (data: UpdateCheckoutLineMutation) => {
  const checkoutMutationResult = data.checkoutLinesUpdate?.checkout;
  const checkout = getCheckout();

  if (checkoutMutationResult) {
    setCheckout({
      ...checkout,
      availablePaymentGateways: checkoutMutationResult.availablePaymentGateways,
      availableShippingMethods: checkoutMutationResult.availableShippingMethods,
      availableShippingMethodsBySeller: checkoutMutationResult.availableShippingMethodsBySeller,
      lines: checkoutMutationResult.lines?.map((line) => ({ ...line, seller: line.seller?.id ?? "" })) ?? [],
      promoCodeDiscount: checkoutMutationResult,
      shippingMethod: checkoutMutationResult.shippingMethod,
    });
  }
};
