import * as React from "react";
import { useQueryParam, StringParam, QueryParamConfig } from 'next-query-params';

import LoginToViewProducts from "components/organisms/LoginToViewProducts/LoginToViewProducts";
import { IFilters } from "@types";
import { useAuth } from "@nautical/react";
import { useShopContext } from "components/providers/ShopProvider";
import {
  convertSortByFromString,
  convertToAttributeScalar,
} from "core/utils";
import { PRODUCTS_PER_PAGE } from "core/config";
import { ProductsQueryVariables } from "@generated";
import { IProps as FilterSidebarProps } from "components/organisms/FilterSidebar/types";
import { IProps as ProductListHeaderProps } from "components/organisms/ProductListHeader/types";

export const FilterQuerySet: QueryParamConfig<IFilters["attributes"]> = {
  encode(valueObj) {
    const str: string[] = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj: Record<string, string[]> = {};
    if (typeof strValue !== 'string') {
      return obj;
    }
    const propsWithValues = strValue?.split(".").filter((n) => n);
    propsWithValues?.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export type ProductsComponentProps = {
  // TODO: Adjust to allow Category and Collection Query as well
  variables: ProductsQueryVariables;
  filters: {
    attributes: FilterSidebarProps["filters"]["attributes"];
    sortBy: ProductListHeaderProps["activeSortOption"];
  };
};

type ProductsListViewProps = {
  ProductsComponent: React.FunctionComponent<ProductsComponentProps>;
};

export const ProductsListView = ({ ProductsComponent }: ProductsListViewProps) => {
  const [sort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const [afterFilters] = useQueryParam("after", StringParam);

  const { user } = useAuth();

  const { loginForProducts, builderKey } = useShopContext();

  const variables: ProductsQueryVariables = {
    after: afterFilters,
    attributes: attributeFilters
      ? convertToAttributeScalar(attributeFilters)
      : {},
    sortBy: convertSortByFromString(sort),
    pageSize: PRODUCTS_PER_PAGE,
  };

  if (!user && loginForProducts) {
    return (<LoginToViewProducts />);
  }
  if (builderKey) {
    // TODO: accept BuilderProducts as a prop as well? TBA in Builder related task
    return null;
  }
  return (
    <ProductsComponent
      variables={variables}
      filters={{
        attributes: attributeFilters,
        sortBy: sort || undefined,
      }}
    />
  );
};

export default ProductsListViewProps;
