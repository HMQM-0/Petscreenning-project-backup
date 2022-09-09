import React, { useCallback } from "react";

import { CheckoutActionCreators, CheckoutActions } from "./actions";
import { ICheckoutStateContext } from "./context";

type useUpdateLinesProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useUpdateLines = ({ dispatch }: useUpdateLinesProps) => {
  return useCallback(
    (lines: ICheckoutStateContext["lines"]) => {
      dispatch(CheckoutActionCreators.updateLines(lines));
    },
    [dispatch],
  );
};

export { useUpdateLines };
