import React, { FunctionComponent } from "react";
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";

import { NauticalProvider as OldNauticalProvider } from "@nautical/react";
import { getApolloClient } from "apollo-client";

import { AuthProvider } from "./Auth";
import { WishlistProvider } from "./Wishlist";

type NauticalProviderProps = {
  children: React.ReactNode;
  initialState: NormalizedCacheObject;
};

const NauticalProvider: FunctionComponent<NauticalProviderProps> = ({ children, initialState }) => {
  const client = getApolloClient(initialState);

  return (
    <OldNauticalProvider
      config={{
        apiUrl: process.env.NEXT_PUBLIC_API_URI as string,
      }}
    >
      <ApolloProvider client={client}>
        <AuthProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </AuthProvider>
      </ApolloProvider>
    </OldNauticalProvider>
  );
};

export default NauticalProvider;
