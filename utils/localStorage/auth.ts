import { LocalStorageItems } from "./constants";
import { retrieveItem, saveItem } from "./items";

export const getSignInToken = (): string | null => {
  return retrieveItem(LocalStorageItems.TOKEN);
};

export const getCsrfToken = (): string | null => {
  return retrieveItem(LocalStorageItems.CSRF_TOKEN);
};

export const setSignInToken = (token: string | null): void => {
  saveItem(LocalStorageItems.TOKEN, token);
};

export const setCsrfToken = (token: string | null): void => {
  saveItem(LocalStorageItems.CSRF_TOKEN, token);
};
