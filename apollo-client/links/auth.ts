import { setContext } from "@apollo/client/link/context";

import { getSignInToken } from "utils";

import { IS_SSR } from "../isSSR";

export const authLink = setContext((_, { headers }) => {
  let authToken: string | null = null;
  if (!IS_SSR) {
    authToken = getSignInToken();
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      origin: process.env.NEXT_PUBLIC_APOLLO_LINK_ORIGIN, // TODO: We need to sync with BE work to switch to a custom header
      Authorization: authToken ? `JWT ${authToken}` : null,
    },
  };
});
