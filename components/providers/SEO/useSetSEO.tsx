import React from "react";

import { DispatchContext } from "./context";

export function useSetSEO() {
  const context = React.useContext(DispatchContext);
  if (!context) {
    throw new Error("useSetSEO must be used within the SEOProvider");
  }
  return context;
}
