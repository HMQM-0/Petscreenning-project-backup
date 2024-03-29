import React from "react";

import { Sort } from "src/components/organisms/ProductListHeader/components/Sort";

interface ProductSortProps {
  defaultSort?: string | undefined;
}

export const ProductSort = ({ defaultSort }: ProductSortProps) => {
  return <Sort defaultSort={defaultSort} />;
};
