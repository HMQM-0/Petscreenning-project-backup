import { IS_SSR } from "utils/isSSR";

import { LocalStorageItems } from "./constants";

/**
 * Stringify object and saves it to local storage.
 * @param name Unique key by which object is identified.
 * @param item Object to be saved. If null, then object is completely removed from local storage.
 */
export function saveObject<T extends object>(name: LocalStorageItems, object: T | null): void {
  if (object && !IS_SSR) {
    localStorage.setItem(name, JSON.stringify(object));
  } else {
    localStorage.removeItem(name);
  }
}

/**
 * Retrieve item from local storage and parse it as object.
 * @param name Unique key by which object is identified.
 */
export function retrieveObject<T extends object>(name: LocalStorageItems): T | null {
  if (IS_SSR) {
    return null;
  }
  const item = localStorage.getItem(name);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}
