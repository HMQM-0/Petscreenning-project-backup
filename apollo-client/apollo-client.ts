import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import { IS_SSR } from "./isSSR";
import { authLink, errorLink, httpLink } from "./links";

let client: ApolloClient<NormalizedCacheObject>;

export const getApolloClient = (initialState?: NormalizedCacheObject) => {
  const cache = new InMemoryCache().restore(initialState || {});
  client = new ApolloClient({
    cache,
    ssrMode: IS_SSR,
  });
  client.link = ApolloLink.from([errorLink(client), authLink, httpLink]);
  return client;
};
