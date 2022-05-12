import React, { FunctionComponent } from "react";
import { ApolloProvider } from "@apollo/client";

import { NauticalProvider as OldNauticalProvider } from "@nautical/react";
import client from "apollo-client";

type NauticalProviderProps = {
  children: React.ReactNode;
};

const NauticalProvider: FunctionComponent<NauticalProviderProps> = ({
  children,
}) => {
  return (
    <OldNauticalProvider
      config={{
        apiUrl: process.env.NEXT_PUBLIC_API_URI as string,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </OldNauticalProvider>
  );
};

export default NauticalProvider;
