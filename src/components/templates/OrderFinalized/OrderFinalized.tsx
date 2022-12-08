import React, { useEffect } from "react";
import { useQueryParams, StringParam } from "next-query-params";
import Cookies from "js-cookie";

import { ThankYou } from "./ThankYou";
import { OrderFinalizedPageQuery } from "./queries.graphql.generated";

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

export const PLACEMENT_DATA = "PLACEMENT_DATA";

const OrderFinalized = ({ nauticalOrderByToken }: OrderFinalizedProps) => {
  const [{ token, orderNumber }] = useQueryParams({
    token: StringParam,
    orderNumber: StringParam,
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

      const placementData = Cookies.get(PLACEMENT_DATA);
      if (placementData) {
        const placementDataParsed = JSON.parse(placementData);
        const placement = {
          identifier: "confirmation_page",
          attributes: {
            // customer identifier - at least one required
            userEmail: placementDataParsed.email,
            // recommended contextual attributes
            firstname: placementDataParsed?.firstname,
            lastname: placementDataParsed?.lastname,
            address1: placementDataParsed?.address1,
            address2: placementDataParsed?.address2,
            city: placementDataParsed?.city,
            state: placementDataParsed?.state,
            country: placementDataParsed?.country,
            zipcode: placementDataParsed?.zipcode,
            amount: placementDataParsed.amount,
            cartItems: JSON.stringify(placementDataParsed.cartItems),
          },
        };

        const launcherInstance = await (window as any).Rokt.createLauncher({
          accountId: "3071804547766951791",
          sandbox: false,
        });
        await launcherInstance.selectPlacements(placement);

        Cookies.remove(PLACEMENT_DATA);
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
