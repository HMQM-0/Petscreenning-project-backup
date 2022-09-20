import * as React from "react";

export const useHandlerWhenClickedOutside = (callback: () => void) => {
  const elementRef = React.useRef<HTMLDivElement>(null);

  const setElementRef = () => elementRef;

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const canRun = elementRef.current && e.target;
      if (canRun) {
        if (elementRef.current!.contains(e.target as Element)) {
          return;
        }
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback]);

  return {
    setElementRef,
  };
};
