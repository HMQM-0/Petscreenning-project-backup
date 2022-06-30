import * as React from "react";
import {
  useQueryParam,
  StringParam,
} from "next-query-params";

import { FilterQuerySet } from "components/organisms";
import LoginToViewProducts from "components/organisms/LoginToViewProducts/LoginToViewProducts";
import { useAuth } from "@nautical/react";
import { useShopContext } from "components/providers/ShopProvider";
import { convertSortByFromString, convertToAttributeScalar } from "core/utils";
import { PRODUCTS_PER_PAGE } from "core/config";

import { ProductsQueryVariables } from "../ProductsPage/queries.graphql.generated";

type ProductsListViewProps = {
  children: React.ReactNode;
};

export const useProductListVariables = (): ProductsQueryVariables => {
  const [sort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters] = useQueryParam("filters", FilterQuerySet);
  const [afterFilters] = useQueryParam("after", StringParam);

  return {
    after: afterFilters,
    attributes: attributeFilters
      ? convertToAttributeScalar(attributeFilters)
      : {},
    sortBy: convertSortByFromString(sort),
    pageSize: PRODUCTS_PER_PAGE,
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
