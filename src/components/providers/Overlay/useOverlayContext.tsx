import React from "react";

import { OverlayContext } from "./context";

export function useOverlayContext() {
  const context = React.useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlayContext must be used within the OverlayContext.Provider");
  }
  return context;
}
