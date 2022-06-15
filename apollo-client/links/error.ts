import {
  ApolloClient,
  fromPromise,
  NormalizedCacheObject,
  ServerError,
} from "@apollo/client";
import { NetworkError } from "@apollo/client/errors";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";

import { getCsrfToken, setSignInToken } from "utils";

import { IS_SSR } from "../isSSR";
import {
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from "../mutations.graphql.generated";

enum DataErrorAuthTypes {
  "SIGN_IN",
  "REFRESH_TOKEN",
  "VERIFY_TOKEN",
  "GET_USER",
}

const isServerError = (error: NetworkError): error is ServerError => {
  return (error as ServerError).statusCode !== undefined;
};

const isUnathenticatedError = (error?: NetworkError) => {
  if (!error) {
    return false;
  }
  if (isServerError(error)) {
    return error.statusCode === 401;
  } else return false;
};

function findValueInEnum<TEnum extends object>(
  needle: string,
  haystack: TEnum
): TEnum[keyof TEnum] {
  const match = Object.entries(haystack).find(([, value]) => value === needle);

  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }

  return needle as unknown as TEnum[keyof TEnum];
}

enum JWTError {
  invalid = "InvalidTokenError",
  invalidSignature = "InvalidSignatureError",
  expired = "ExpiredSignatureError",
}

function isJwtError(error: GraphQLError): boolean {
  let jwtError: boolean;
  try {
    // @ts-ignore TODO: error.extensions is `unknown` need to resolve this
    const code = error.extensions?.exception.code as string;
    jwtError = !!findValueInEnum(code, JWTError);
  } catch (e) {
    jwtError = false;
  }

  return jwtError;
}

type GetNewTokenPayload = {
  data: {
    token: string | null;
    user: { id: string } | null;
  };
};

const getNewToken = async (
  client: ApolloClient<NormalizedCacheObject>,
  refreshToken?: string
): Promise<GetNewTokenPayload> => {
  const csrfToken = getCsrfToken();

  if (!csrfToken || !refreshToken) {
    throw new Error(
      "Refresh sign in token impossible. No refresh token received."
    );
  }

  const { data, errors } = await client.mutate<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >({
    fetchPolicy: "no-cache",
    mutation: RefreshTokenDocument,
    variables: {
      csrfToken,
      refreshToken,
    },
  });

  if (errors?.length) {
    throw errors;
  }
  if (data?.tokenRefresh?.errors.length) {
    throw data.tokenRefresh.errors;
  }

  return {
    data: {
      token: data?.tokenRefresh?.token ?? null,
      user: data?.tokenRefresh?.user ?? null,
    },
  };
};

export const errorLink = (client: ApolloClient<NormalizedCacheObject>) =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (!IS_SSR && graphQLErrors) {
      const isTokenExpired = graphQLErrors?.some(isJwtError);
      if (isTokenExpired || isUnathenticatedError(networkError))
        return fromPromise(
          getNewToken(client).catch((error) => {
            // TODO: Handle token refresh errors e.g clear stored tokens, redirect to login
            // await this.api?.auth.signOut(); TODO: Add the sign out method
            const getNewTokenPayload: GetNewTokenPayload = {
              data: {
                token: null,
                user: null,
              },
            };
            return getNewTokenPayload;
          })
        )
          .filter((value) => Boolean(value))
          .flatMap(({ data }) => {
            const token = data.token;
            setSignInToken(token);
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${token}`,
              },
            });

            // retry the request, returning the new observable
            return forward(operation);
          });
    }
  });
