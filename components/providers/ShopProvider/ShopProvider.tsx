import * as React from "react";

import { defaultContext, ShopContext } from "./context";
import { useGetShopQuery } from "./queries.graphql.generated";

type ShopProviderProps = {
  children: React.ReactNode;
};

const ShopProvider = ({ children }: ShopProviderProps) => {
  const { data } = useGetShopQuery();
  return <ShopContext.Provider value={data?.shop ?? defaultContext}>{children}</ShopContext.Provider>;
};

export { ShopProvider };
