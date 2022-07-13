import React, { useEffect } from "react";

import { getCheckout, setCheckout } from "utils";

import { CheckoutActionCreators, CheckoutActions } from "./actions";
import { useGetUserCheckout } from "./helpers/useGetUserCheckout";
import { ICheckoutContext } from "./context";

import { useAuth } from "../Auth";

type useInitializeCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useInitializeCheckout = ({ dispatch }: useInitializeCheckoutProps) => {
  const { authenticated } = useAuth();
  const getUserCheckout = useGetUserCheckout();

  useEffect(() => {
    const init = async () => {
      const checkout = getCheckout();

      const { data, error } = await getUserCheckout(Boolean(authenticated), checkout?.token);

      if (error) {
        // TODO: What sort of error handling is appropriate here?
        // return {
        //   dataError: {
        //     error,
        //     type: DataErrorCheckoutTypes.GET_CHECKOUT,
        //   },
        // };
      }

      const newCheckout = data || checkout;

      if (newCheckout) {
        setCheckout(newCheckout);
      }

      const initializedCheckout: Partial<ICheckoutContext> = {
        ...newCheckout,
        loaded: true,
      };

      dispatch(CheckoutActionCreators.initializeCheckout(initializedCheckout));
    };

    init();
  }, [authenticated, dispatch, getUserCheckout]);
};

export { useInitializeCheckout };
