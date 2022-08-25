import * as React from "react";
import {
  useQueryParam,
  StringParam,
} from "next-query-params";

import { FilterQuerySet } from "components/organisms";
import LoginToViewProducts from "components/organisms/LoginToViewProducts/LoginToViewProducts";
import { useAuth } from "nautical-api";
import { useShopContext } from "components/providers/ShopProvider";
import { convertSortByFromString, convertToAttributeScalar } from "core/utils";
import { PRODUCTS_PER_PAGE } from "core/config";

import { ProductsQueryVariables } from "./queries.graphql.generated";

type ProductsListViewProps = {
  children: React.ReactNode;
};

export const useProductListVariables = (): ProductsQueryVariables => {
  const [sort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters] = useQueryParam("filters", FilterQuerySet);
  const [afterFilters] = useQueryParam("after", StringParam);
  const [beforeFilters] = useQueryParam("before", StringParam);

  return {
    after: afterFilters,
    // Prevent sending both `after` and `before` at the same time
    before: !afterFilters ? beforeFilters : undefined,
    // For `after` we use `first` (or when there no `after` and no `before`)
    first: (afterFilters || !beforeFilters) ? PRODUCTS_PER_PAGE : undefined,
    // For `before` we use `last`
    last: (!afterFilters && beforeFilters) ? PRODUCTS_PER_PAGE : undefined,
    attributes: attributeFilters
      ? convertToAttributeScalar(attributeFilters)
      : {},
    sortBy: convertSortByFromString(sort),
  };
};

export const ProductsListView = ({ children }: ProductsListViewProps) => {
  const { user } = useAuth();

  const { loginForProducts } = useShopContext();

  if (!user && loginForProducts) {
    return <LoginToViewProducts />;
  }

  return (
    <>{children}</>
  );
};

export default ProductsListViewProps;
