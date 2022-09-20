import { setCheckout, setPayment } from "src/utils";

import { ICheckoutStateContext } from "./context";

type useSyncLocalStorageProps = {
  checkout: ICheckoutStateContext;
};

const useSyncLocalStorage = ({ checkout }: useSyncLocalStorageProps) => {
  if (checkout.loaded) {
    setCheckout(checkout);
    setPayment(checkout.payment ?? null);
  }
};

export { useSyncLocalStorage };
