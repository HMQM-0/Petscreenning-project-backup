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

const useGetUserCheckout = () => {
  const client = useApolloClient();

  return useCallback(
    async (isUserSignedIn: boolean, checkoutToken: string | null) => {
      let checkout: CheckoutFragment | null;
      try {
        checkout = await new Promise((resolve, reject) => {
          if (isUserSignedIn) {
            const observable = client.watchQuery<UserCheckoutDetailsQuery, any>({
              fetchPolicy: "network-only",
              query: UserCheckoutDetailsDocument,
            });
            observable.subscribe(
              (result) => {
                const { data, errors } = result;
                if (errors?.length) {
                  reject(errors);
                } else {
                  resolve(data.me?.checkout ?? null);
                }
              },
              (error) => {
                reject(error);
              }
            );
          } else if (checkoutToken) {
            const observable = client.watchQuery<CheckoutDetailsQuery, any>({
              fetchPolicy: "network-only",
              query: CheckoutDetailsDocument,
              variables: {
                token: checkoutToken,
              },
            });
            observable.subscribe(
              (result) => {
                const { data, errors } = result;
                if (errors?.length) {
                  reject(errors);
                } else {
                  resolve(data.checkout ?? null);
                }
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            resolve(null);
          }
        });

        if (checkout) {
          return {
            data: constructCheckoutModel(checkout),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
      return {};
    },
    [client]
  );
};

export { useGetUserCheckout };
