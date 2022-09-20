import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

import { CheckoutFragment } from "../fragments.graphql.generated";
import {
  CheckoutDetailsDocument,
  CheckoutDetailsQuery,
  UserCheckoutDetailsDocument,
  UserCheckoutDetailsQuery,
} from "../queries.graphql.generated";
import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { DataErrorCheckoutTypes } from "../types";

const useGetUserCheckout = () => {
  const client = useApolloClient();

  return useCallback(
    async (isUserSignedIn: boolean, checkoutToken: string | null) => {
      let checkout: CheckoutFragment | null;
      try {
        checkout = await new Promise(async (resolve, reject) => {
          if (isUserSignedIn && checkoutToken) {
            const { data, errors } = await client.query<UserCheckoutDetailsQuery, any>({
              fetchPolicy: "network-only",
              query: UserCheckoutDetailsDocument,
            });
            if (errors?.length) {
              reject(errors);
            } else {
              resolve(data.me?.checkout ?? null);
            }
          } else if (checkoutToken) {
            const { data, errors } = await client.query<CheckoutDetailsQuery, any>({
              fetchPolicy: "network-only",
              query: CheckoutDetailsDocument,
              variables: {
                token: checkoutToken,
              },
            });
            if (errors?.length) {
              reject(errors);
            } else {
              resolve(data.checkout ?? null);
            }
          } else {
            resolve(null);
          }
        });

        if (checkout) {
          return {
            data: constructCheckoutModel(checkout),
          };
        }

        if (!checkout && isUserSignedIn) {
          return {
            error: {
              type: DataErrorCheckoutTypes.USER_CHECKOUT_DOES_NOT_EXIST,
            },
          };
        }
      } catch (error) {
        return {
          error: {
            type: DataErrorCheckoutTypes.GET_CHECKOUT,
          },
        };
      }
      return {};
    },
    [client],
  );
};

export { useGetUserCheckout };
