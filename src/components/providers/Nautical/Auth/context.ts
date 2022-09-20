import { noop } from "lodash";
import { createContext } from "react";

import { UserDetailsQuery } from "./queries.graphql.generated";

export type IAuthContext = {
  /**
   * Indicates if data is initialized, initially retrieved from cache or initially fetched.
   */
  loaded: boolean;
  /**
   * Indicates if data is currently being fetched.
   */
  fetching: boolean;
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
  /**
   * Any errors from the server related to sign in
   */
  errors: { message: string; field?: string }[];
  signIn: (email: string, password: string, autoSignIn?: boolean) => void;
  signOut: () => void;
};

export const INITIAL_STATE: IAuthContext = {
  loaded: false,
  signedOut: false,
  fetching: false,
  errors: [],
  signIn: async (email: string, password: string, autoSignIn?: boolean) => {},
  signOut: noop,
};

export const AuthContext = createContext<IAuthContext>(INITIAL_STATE);
