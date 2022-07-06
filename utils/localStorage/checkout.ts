import { ICheckoutModel } from "components/providers/Nautical/Checkout/types";

import { LocalStorageItems } from "./constants";
import { retrieveObject, saveObject } from "./objects";

export function getCheckout(): ICheckoutModel | null {
  return retrieveObject(LocalStorageItems.CHECKOUT);
}

export function setCheckout(checkout: ICheckoutModel | null): void {
  saveObject(LocalStorageItems.CHECKOUT, checkout);
}
