import * as React from "react";

export const useClickedOutside = () => {
  const [clickedOutside, setClickedOutside] = React.useState<boolean>(false);
  const elementRef = React.useRef<HTMLElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (elementRef.current && e.target) {
      setClickedOutside(elementRef.current?.contains(e.target as Node) ?? false);
    }
  };

  const setElementRef = () => elementRef;

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    clickedOutside,
    setElementRef,
  };
};
