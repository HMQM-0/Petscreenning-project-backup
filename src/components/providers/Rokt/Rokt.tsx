import React, { createContext, useContext, useEffect, useState } from "react";

export const RoktLauncherContext = createContext<any | null>(null);
export const RoktLauncherContextConsumer = RoktLauncherContext.Consumer;

export function useRoktLauncher() {
  return useContext(RoktLauncherContext);
}

interface IRoktProviderProps {
  children: React.ReactNode;
}

const RoktLauncherContextProvider = (props: IRoktProviderProps) => {
  const [launcher, setLauncher] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      // Guards against Rokt script being still loaded into the application when the context is created
      if (document) {
        await new Promise<void>((resolve) =>
          (window as any).Rokt
            ? resolve()
            : document.getElementById("rokt-launcher")?.addEventListener("load", () => resolve()),
        );
      }

      const launcherInstance = await (window as any).Rokt.createLauncher({
        accountId: "3071804547766951791",
        sandbox: true,
      });

      setLauncher(launcherInstance);
    })();

    return () => {
      if (launcher) {
        launcher.terminate();
      }
    };
  }, [launcher]);

  // Return the context provider
  return <RoktLauncherContext.Provider value={launcher}>{props.children}</RoktLauncherContext.Provider>;
};

export { RoktLauncherContextProvider };
export default RoktLauncherContextProvider;
