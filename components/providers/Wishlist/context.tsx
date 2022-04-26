import * as React from "react";
import { ApolloError } from "@apollo/client";

import { WishlistItemFragment } from "@generated";

export interface IWishlistContext {
  wishlist: WishlistItemFragment[] | null;
  loading: boolean;
  error: ApolloError | null;
  update(): void;
}

export const WishlistContext = React.createContext<IWishlistContext>({
  error: null,
  loading: false,
  update: () => null,
  wishlist: [],
});

WishlistContext.displayName = "WishlistContext";
