import React from "react";

import { ShopContext } from "./context";

export function useShopContext() {
  const context = React.useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used with ShopProvider as a parent node");
  }
  return context;
}
