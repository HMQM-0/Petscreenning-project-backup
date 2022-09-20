import React from "react";

import { CartContext } from "./context";

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within the CartProvider");
  }
  return context;
}
