import { LocalStorageItems } from "./constants";

import { IS_SSR } from "../isSSR";

/**
 * Save string item to local storage.
 * @param name Unique key by which item is identified.
 * @param item String to be saved. If null, then item is completely removed from local storage.
 */
export const saveItem = (name: LocalStorageItems, item: string | null): void => {
  if (IS_SSR) {
    return;
  }
  if (item) {
    localStorage.setItem(name, item);
  } else {
    localStorage.removeItem(name);
  }
};

/**
 * Retrieve string item from local storage.
 * @param name Unique key by which item is identified.
 */
export const retrieveItem = (name: LocalStorageItems): string | null => {
  if (IS_SSR) {
    return null;
  }
  return localStorage.getItem(name);
};
