import React, { useCallback, useEffect } from "react";

export const useNetworkStatus = (callBack?: (online?: boolean) => void) => {
  const [online, setOnline] = React.useState(true);
  useEffect(() => {
    setOnline("onLine" in navigator ? navigator.onLine : true);
  }, []);

  const updateOnlineStatus = useCallback(() => {
    const status = navigator.onLine;

    if (callBack) {
      callBack(status);
    }
    setOnline(navigator.onLine);
  }, [callBack]);

  React.useEffect(() => {
    addEventListener("offline", updateOnlineStatus);
    addEventListener("online", updateOnlineStatus);

    return () => {
      removeEventListener("offline", updateOnlineStatus);
      removeEventListener("online", updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  return { online };
};
