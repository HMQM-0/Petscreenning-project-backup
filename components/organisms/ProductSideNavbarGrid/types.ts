import React from "react";

import { ProductsPageMenuAndAttributesQuery } from "@generated";

export interface IProps {
  children: React.ReactNode;
  matches: boolean;
  menu: ProductsPageMenuAndAttributesQuery["menu"];
}
