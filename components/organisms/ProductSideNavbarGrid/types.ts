import React from "react";

import { ProductsPageMenuAndAttributesQuery } from "components/templates/ProductsList/queries.graphql.generated";

export interface IProps {
  children: React.ReactNode;
  matches: boolean;
  menu: ProductsPageMenuAndAttributesQuery["menu"];
}
