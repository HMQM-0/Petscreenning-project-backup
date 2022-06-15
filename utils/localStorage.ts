export enum LocalStorageItems {
  TOKEN = "token",
  CSRF_TOKEN = "csrf_token",
  CHECKOUT = "data_checkout",
  PAYMENT = "data_payment",
}

export const getSignInToken = (): string | null => {
  return localStorage.getItem(LocalStorageItems.TOKEN);
};

export const getCsrfToken = (): string | null => {
  return localStorage.getItem(LocalStorageItems.CSRF_TOKEN);
};

export const setSignInToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem(LocalStorageItems.TOKEN, token);
  } else {
    localStorage.removeItem(LocalStorageItems.TOKEN);
  }
};

export const setCsrfToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem(LocalStorageItems.CSRF_TOKEN, token);
  } else {
    localStorage.removeItem(LocalStorageItems.CSRF_TOKEN);
  }
};
