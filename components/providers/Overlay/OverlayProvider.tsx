import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "./context";

type OverlayProviderProps = {
  children: React.ReactNode;
};

const CLOSE_DELAY = 2500;

const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const router = useRouter();
  const [type, setType] = useState<OverlayContextInterface["type"]>(null);
  const [theme, setTheme] = useState<OverlayContextInterface["theme"]>(null);
  const [context, setContext] = useState<OverlayContextInterface["context"]>(
    {}
  );

  const hide = useCallback(() => {
    setType(null);
    document.body.style.overflow = "";
  }, []);

  const show = useCallback(
    (
      type: OverlayType,
      theme?: OverlayTheme,
      context?: InnerOverlayContextInterface
    ) => {
      console.log("called show", type);
      type && setType(type);
      theme && setTheme(theme);
      context && setContext(context);

      document.body.style.overflow =
        type !== OverlayType.message ? "hidden" : "";

      if (type === OverlayType.message) {
        setTimeout(hide, CLOSE_DELAY);
      }
    },
    [hide]
  );

  useEffect(() => {
    const handleRouteChange = () => {
      if (type !== OverlayType.message) {
        hide();
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, type, hide]);

  const value: OverlayContextInterface = useMemo(
    () => ({
      context,
      hide,
      show,
      theme,
      type,
    }),
    [context, hide, show, theme, type]
  );

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};

export { OverlayProvider };
