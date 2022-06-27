import { LocalStorageItems } from "./constants";
/**
 * Save string item to local storage.
 * @param name Unique key by which item is identified.
 * @param item String to be saved. If null, then item is completely removed from local storage.
 */
export const saveItem = (name: LocalStorageItems, item: string | null): void => {
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
  return localStorage.getItem(name);
};
