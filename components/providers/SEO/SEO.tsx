import React, { useState } from "react";

import { META_DEFAULTS } from "core/config";

import { Provider, DispatchContext, SEOContextInterface } from "./context";

type SEOProviderProps = {
  children: React.ReactNode;
};

const SEOProvider = ({ children }: SEOProviderProps) => {
  const [seo, setSeo] = useState<SEOContextInterface>(META_DEFAULTS);
  return (
    <Provider value={seo}>
      <DispatchContext.Provider value={setSeo}>
        {children}
      </DispatchContext.Provider>
    </Provider>
  );
};

export { SEOProvider };
