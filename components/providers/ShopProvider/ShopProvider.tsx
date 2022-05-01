import * as React from "react";

import { useGetShopQuery } from "@generated";

import { defaultContext, ShopContext } from "./context";

type ShopProviderProps = {
  children: React.ReactNode;
};

const ShopProvider = ({ children }: ShopProviderProps) => {
  const { data } = useGetShopQuery();
  return (
    <ShopContext.Provider value={data?.shop ?? defaultContext}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };
