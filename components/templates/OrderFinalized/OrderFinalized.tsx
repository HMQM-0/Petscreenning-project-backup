import React, { useEffect } from "react";
import { useQueryParams, StringParam } from "next-query-params";

import { useNauticalOrderDetails } from "@nautical/react";
import { Loader } from "components/atoms/Loader";

import { ThankYou } from "./ThankYou";
type OrderFinalizedProps = {};

const OrderFinalized = ({}: OrderFinalizedProps) => {
  const [{ token, orderNumber }] = useQueryParams({
    token: StringParam,
    orderNumber: StringParam,
  });
  const { data: order, loading } = useNauticalOrderDetails(
    { token },
    { fetchPolicy: "cache-first" }
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <ThankYou
      orderNumber={orderNumber ?? ""}
      orderEmail={order?.userEmail}
      token={token ?? ""}
    />
  );
};

export { OrderFinalized };
