import { ICheckoutModel } from "components/providers/Nautical/Cart/types";

import { LocalStorageItems } from "./constants";
import { retrieveObject } from "./objects";

export function getCheckout(): ICheckoutModel | null {
  return retrieveObject(LocalStorageItems.CHECKOUT);
}
