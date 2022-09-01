import React, { useEffect } from "react";

import { IS_SSR } from "utils";

export const useNetworkStatus = (callBack?: (online?: boolean) => void) => {
  const [online, setOnline] = React.useState(true);
  useEffect(() => {
    setOnline("onLine" in navigator ? navigator.onLine : true);
  }, []);

  const updateOnlineStatus = () => {
    const status = navigator.onLine;

    if (callBack) {
      callBack(status);
    }
    setOnline(navigator.onLine);
  };

  React.useEffect(() => {
    addEventListener("offline", updateOnlineStatus);
    addEventListener("online", updateOnlineStatus);

    return () => {
      removeEventListener("offline", updateOnlineStatus);
      removeEventListener("online", updateOnlineStatus);
    };
  }, []);

  return { online };
};
