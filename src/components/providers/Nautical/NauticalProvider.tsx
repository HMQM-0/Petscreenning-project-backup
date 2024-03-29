import React, { FunctionComponent } from "react";
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";

import { getApolloClient } from "src/apollo-client";

import { AuthProvider } from "./Auth";
import { WishlistProvider } from "./Wishlist";
import { CartProvider } from "./Cart";
import { CheckoutProvider } from "./Checkout";

type NauticalProviderProps = {
  children: React.ReactNode;
  initialState: NormalizedCacheObject;
};

const NauticalProvider: FunctionComponent<NauticalProviderProps> = ({ children, initialState }) => {
  const client = getApolloClient(initialState);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CheckoutProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </CheckoutProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default NauticalProvider;
