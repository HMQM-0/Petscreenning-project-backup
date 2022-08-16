import { setContext } from "@apollo/client/link/context";

import { getSignInToken, IS_SSR } from "utils";

export const authLink = setContext((_, { headers }) => {
  let authToken: string | null = null;
  if (!IS_SSR) {
    authToken = getSignInToken();
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: authToken ? `JWT ${authToken}` : null,
    },
  };
});
