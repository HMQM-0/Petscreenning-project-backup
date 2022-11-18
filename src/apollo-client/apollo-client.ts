import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";

import { IS_SSR } from "src/utils/isSSR";

import { getAuthLink, getErrorLink, httpLink } from "./links";

let client: ApolloClient<NormalizedCacheObject>;

export const getApolloClient = (initialState?: NormalizedCacheObject, headers?: Record<string, string>) => {
  const cache = new InMemoryCache().restore(initialState || {});
  const errorLink = getErrorLink(client);
  const authLink = getAuthLink(headers?.origin);
  client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache,
    ssrMode: IS_SSR,
  });

  return client;
};

export const getSsrApolloClient = (context: GetServerSidePropsContext) => {
  // `host` is passed from the browser, so passing it to the api as `origin`
  const origin = context.req.headers.host;
  const headers = origin ? { origin } : undefined;
  console.log("headers", headers);
  return getApolloClient(undefined, headers);
};
