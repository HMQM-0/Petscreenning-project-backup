import React, { FunctionComponent } from "react";
import { ApolloProvider } from "@apollo/client";

import client from "@apollo-client";

type NauticalProviderProps = {
  children: React.ReactNode;
};

const NauticalProvider: FunctionComponent<NauticalProviderProps> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default NauticalProvider;
