import React from "react";
import { useQueryParams, StringParam } from "next-query-params";

import { ThankYou } from "./ThankYou";
import { OrderFinalizedPageQuery } from "./queries.graphql.generated";

type OrderFinalizedProps = {
  nauticalOrderByToken: OrderFinalizedPageQuery["nauticalOrderByToken"];
};

const OrderFinalized = ({ nauticalOrderByToken }: OrderFinalizedProps) => {
  const [{ token, orderNumber }] = useQueryParams({
    token: StringParam,
    orderNumber: StringParam,
  });

  return (
    <ThankYou
      orderNumber={orderNumber ?? ""}
      orderEmail={nauticalOrderByToken?.userEmail ?? ""}
      token={token ?? ""}
    />
  );
};

export { OrderFinalized };
