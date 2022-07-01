import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import { IS_SSR } from "utils/isSSR";

import { authLink, errorLink, httpLink } from "./links";

let client: ApolloClient<NormalizedCacheObject>;

export const getApolloClient = (initialState?: NormalizedCacheObject) => {
  const cache = new InMemoryCache().restore(initialState || {});
  const error = errorLink(client);
  client = new ApolloClient({
    link: ApolloLink.from([error, authLink, httpLink]),
    cache,
    ssrMode: IS_SSR,
  });

  return client;
};
