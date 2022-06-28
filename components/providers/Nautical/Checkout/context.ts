import { createContext } from "react";

export type ICheckoutContext = {};

export const INITIAL_STATE: ICheckoutContext = {};

export const CheckoutContext = createContext<ICheckoutContext>(INITIAL_STATE);
