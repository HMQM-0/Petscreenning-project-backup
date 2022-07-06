import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { noop } from "lodash";
import { createContext } from "react";

import { UserDetailsQuery } from "./queries.graphql.generated";

export type IAuthContext = {
  /**
   * Indicates if data is initialized, initially retrieved from cache or initially fetched.
   */
  loaded: boolean;
  /**
   * User object with currently signed in user data.
   */
  user?: UserDetailsQuery["me"] | null; // TODO: Fragment
  /**
   * Indicates if user is signed in.
   */
  authenticated?: boolean;
  /**
   * Token used for user authentication.
   */
  token?: string;
  /**
   * Indicates if a user was authenticated, but has signed out
   */
  signedOut: boolean;
  signIn: (
    email: string,
    password: string,
    autoSignIn?: boolean
  ) => Promise<
    | {
        errors: readonly GraphQLError[];
      }
    | {
        errors: ApolloError[];
      }
    | {
        errors: null;
      }
  >;
  signOut: () => void;
};

export const INITIAL_STATE: IAuthContext = {
  loaded: false,
  signedOut: false,
  signIn: async (email: string, password: string, autoSignIn?: boolean) => ({
    errors: null,
  }),
  signOut: noop,
};

export const AuthContext = createContext<IAuthContext>(INITIAL_STATE);
