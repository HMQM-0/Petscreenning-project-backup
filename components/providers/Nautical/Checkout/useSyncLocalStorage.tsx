import { setCheckout } from "utils";

import { ICheckoutContext } from "./context";

type useSyncLocalStorageProps = {
  checkout: ICheckoutContext;
};

const useSyncLocalStorage = ({ checkout }: useSyncLocalStorageProps) => {
  if (checkout.loaded) {
    setCheckout(checkout);
  }
};

export { useSyncLocalStorage };
