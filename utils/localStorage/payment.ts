import { IPaymentModel } from "components/providers/Nautical/Checkout/types";

import { LocalStorageItems } from "./constants";
import { retrieveObject, saveObject } from "./objects";

export function getPayment(): IPaymentModel | null {
  return retrieveObject(LocalStorageItems.PAYMENT);
}

export function setPayment(payment: IPaymentModel | null): void {
  saveObject(LocalStorageItems.PAYMENT, payment);
}
