import React from "react";
import { useImmerReducer } from "use-immer";

import { CheckoutDispatch } from "./CheckoutDispatch";
import { CheckoutStateContext, ICheckoutStateContext, CHECKOUT_STATE_CONTEXT_INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useInitializeCheckout } from "./useInitializeCheckout";
import { useOnSignOut } from "./useOnSignOut";
import { useSyncLocalStorage } from "./useSyncLocalStorage";

type CheckoutProps = {
  children: React.ReactNode;
};

const CheckoutProvider = ({ children }: CheckoutProps) => {
  const [checkout, dispatch] = useImmerReducer(reducer, CHECKOUT_STATE_CONTEXT_INITIAL_STATE);

  useInitializeCheckout({ dispatch });
  useOnSignOut({ dispatch });
  useSyncLocalStorage({ checkout });

  const value: ICheckoutStateContext = {
    ...checkout,
  };

  return (
    <CheckoutStateContext.Provider value={value}>
      <CheckoutDispatch dispatch={dispatch}>{children}</CheckoutDispatch>
    </CheckoutStateContext.Provider>
  );
};

export { CheckoutProvider };
