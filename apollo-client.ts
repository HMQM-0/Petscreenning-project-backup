import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const IS_SSR = typeof window === "undefined";

// TODO: Use links to attach Auth token
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      origin: process.env.NEXT_PUBLIC_APOLLO_LINK_ORIGIN, // TODO: We need to sync with BE work to switch to a custom header
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const getApolloClient = (initialState?: NormalizedCacheObject) => {
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    ssrMode: IS_SSR,
  });
};
