import * as React from "react";

export enum OverlayType {
  cart = "cart",
  login = "login",
  message = "message",
  sideNav = "side-nav",
  password = "password",
  mainMenuNav = "main-menu-nav",
  modal = "modal",
  register = "register",
  search = "search",
}

export enum OverlayTheme {
  left = "left",
  right = "right",
  modal = "modal",
  top = "top",
}

export interface InnerOverlayContextInterface {
  title?: string;
  content?: string | React.ReactNode;
  status?: "success" | "error";
  logo?: React.ReactNode | null;
}

export type ShowOverlayType = (type: OverlayType, theme?: OverlayTheme, context?: InnerOverlayContextInterface) => void;

export interface OverlayContextInterface {
  type: OverlayType | null;
  theme: OverlayTheme | null;
  context: InnerOverlayContextInterface;
  show: ShowOverlayType;

  hide(): void;
}

export const OverlayContext = React.createContext<OverlayContextInterface>({
  context: {},
  hide: () => {},
  show: (type) => {},
  theme: null,
  type: null,
});
