import { IPaymentModel } from "components/providers/Nautical/Checkout/types";

import { LocalStorageItems } from "./constants";
import { retrieveItem, saveItem } from "./items";
import { retrieveObject, saveObject } from "./objects";

export function getPayment(): IPaymentModel | null {
  return retrieveObject(LocalStorageItems.PAYMENT);
}

export function setPayment(payment: IPaymentModel | null): void {
  saveObject(LocalStorageItems.PAYMENT, payment);
}

export function getNauticalPaymentId(): string | null {
  return retrieveItem(LocalStorageItems.NAUTICAL_PAYMENT_ID);
}

export function setNauticalPaymentId(paymentId: string | null): void {
  saveItem(LocalStorageItems.NAUTICAL_PAYMENT_ID, paymentId);
}

export function getNauticalClientSecret(): string | null {
  return retrieveItem(LocalStorageItems.NAUTICAL_CLIENT_SECRET);
}

export function setNauticalClientSecret(clientSecret: string | null): void {
  saveItem(LocalStorageItems.NAUTICAL_CLIENT_SECRET, clientSecret);
}
