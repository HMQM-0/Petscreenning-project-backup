import React from "react";

import { ListItem } from "./ProductSideNavbar";
import { IProps } from "./types";

export const ProductSideNavbarList = ({
  items,
}: IProps) => {
  return (
    <>
      {items?.map((item, index) => (
        <ListItem
          item={item}
          key={index}
        />
      ))}
    </>
  );
};
