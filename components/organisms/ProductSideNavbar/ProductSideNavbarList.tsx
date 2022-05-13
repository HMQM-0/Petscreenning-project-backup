import React from "react";

import { ListItem } from "./ProductSideNavbar";
import { IProps, IState } from "./types";

export const ProductSideNavbarList = ({
  items,
}: IProps) => {
  const [, _setView] = React.useState<IState>({
    buffer: { index: null, depth: null },
    depth: null,
    index: null,
  });

  const setView = React.useCallback((state: Partial<IState>) => {
    _setView((view) => ({
      ...view,
      ...state,
      buffer: { ...view.buffer, ...state },
    }));
  }, []);

  return (
    <>
      {items?.map((item, index) => (
        <ListItem
          onClick={() => {
            setView({ index });
          }}
          item={item}
          key={index}
        />
      ))}
    </>
  );
};
