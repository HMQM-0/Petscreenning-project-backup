import React, { useEffect } from "react";

import { ICartContext } from "./context";
import { useRefreshCheckoutLines } from "./helpers";

type useInitializeCartProps = {
  items: ICartContext["items"];
  loaded: ICartContext["loaded"];
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const useInitializeCart = ({ items, loaded, setLoaded }: useInitializeCartProps) => {
  const refreshCheckoutLines = useRefreshCheckoutLines();

  useEffect(() => {
    const init = async () => {
      if (items) {
        await refreshCheckoutLines(items);
      }
      setLoaded(true);
    };

    if (!loaded) {
      init();
    }
  }, [items, refreshCheckoutLines, loaded, setLoaded]);
};

export { useInitializeCart };
