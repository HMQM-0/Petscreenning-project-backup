import { setContext } from "@apollo/client/link/context";

import { getSignInToken, IS_SSR } from "src/utils";

export const getAuthLink = (origin?: string) =>
  setContext((_, { headers }) => {
    let authToken: string | null = null;
    if (!IS_SSR) {
      authToken = getSignInToken();
    }

    const ORIGIN = origin || process.env.NEXT_PUBLIC_APOLLO_LINK_ORIGIN;

    const HEADERS = {
      ...headers,
      ...(ORIGIN ? { origin: ORIGIN } : {}),
      Authorization: authToken ? `JWT ${authToken}` : null,
    };
    // return the headers to the context so httpLink can read them
    return {
      headers: HEADERS,
    };
  });
