import React, { useEffect } from "react";
import { useQueryParams, StringParam } from "next-query-params";
import Cookies from "js-cookie";

import { ThankYou } from "./ThankYou";
import { OrderFinalizedPageQuery } from "./queries.graphql.generated";

import { useNauticalOrderByTokenQuery } from "../OrderHistoryDetailsPage/queries.graphql.generated";

type OrderFinalizedProps = {
  nauticalOrderByToken: OrderFinalizedPageQuery["nauticalOrderByToken"];
};

export const mapItemsForRoktPlacement = (items?: any | null) => {
  return items?.map((i: any) => {
    return {
      price: i?.totalPrice?.net?.amount,
      quantity: i?.quantity,
      majorcat: "",
      minorcat: "",
      productname: i?.variant?.product?.name || "",
      sku: i?.variant?.sku,
    };
  });
};

const OrderFinalized = ({ nauticalOrderByToken }: OrderFinalizedProps) => {
  const [{ token, orderNumber }] = useQueryParams({
    token: StringParam,
    orderNumber: StringParam,
  });

  const { data } = useNauticalOrderByTokenQuery({
    variables: { token: token },
  });

  useEffect(() => {
    const createRoktPlacement = async () => {
      if (document) {
        await new Promise<void>((resolve) =>
          (window as any).Rokt
            ? resolve()
            : document.getElementById("rokt-launcher")?.addEventListener("load", () => resolve()),
        );
      }

      if (data?.nauticalOrderByToken) {
        const { lines, shippingAddress, userEmail, total } = data?.nauticalOrderByToken;
        const mappedItems = mapItemsForRoktPlacement(lines);
        let launcher = await (window as any).Rokt.createLauncher({
          accountId: "3071804547766951791",
          sandbox: true,
        });

        await launcher.selectPlacements({
          attributes: {
            // customer identifier - at least one required
            userEmail,
            // recommended contextual attributes
            firstname: shippingAddress?.firstName,
            lastname: shippingAddress?.lastName,
            address1: shippingAddress?.streetAddress1,
            address2: shippingAddress?.streetAddress2,
            city: shippingAddress?.city,
            state: shippingAddress?.countryArea,
            country: shippingAddress?.country.country,
            zipcode: shippingAddress?.postalCode,
            amount: total?.gross.amount,
            currency: "USD",
            paymenttype: "Credit Card",
            cartItems: JSON.stringify(mappedItems),
          },
        });
      }
    };

    createRoktPlacement();
  }, []);

  return (
    <ThankYou
      orderNumber={orderNumber ?? ""}
      orderEmail={nauticalOrderByToken?.userEmail ?? ""}
      token={token ?? ""}
    />
  );
};

export { OrderFinalized };
