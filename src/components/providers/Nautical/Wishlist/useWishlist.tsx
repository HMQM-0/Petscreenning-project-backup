import React from "react";

import { WishlistContext } from "./context";

export function useWishlist() {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
}
