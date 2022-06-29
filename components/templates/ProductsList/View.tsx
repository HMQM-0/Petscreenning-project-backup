import * as React from "react";
import {
  useQueryParam,
  StringParam,
  QueryParamConfig,
} from "next-query-params";

import LoginToViewProducts from "components/organisms/LoginToViewProducts/LoginToViewProducts";
import { IFilters } from "@types";
import { useAuth } from "@nautical/react";
import { useShopContext } from "components/providers/ShopProvider";
import { convertSortByFromString, convertToAttributeScalar } from "core/utils";
import { PRODUCTS_PER_PAGE } from "core/config";

import { ProductsQueryVariables } from "../ProductsPage/queries.graphql.generated";

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
    if (typeof strValue !== "string") {
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

export type ChildrenFunctionProps = {
  variables: ProductsQueryVariables;
};

type ProductsListViewProps = {
  children: (props: ChildrenFunctionProps) => React.ReactNode;
};

export const ProductsListView = ({ children }: ProductsListViewProps) => {
  const [sort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters] = useQueryParam("filters", FilterQuerySet);
  const [afterFilters] = useQueryParam("after", StringParam);

  const { user } = useAuth();

  const { loginForProducts } = useShopContext();

  const variables: ProductsQueryVariables = {
    after: afterFilters,
    attributes: attributeFilters
      ? convertToAttributeScalar(attributeFilters)
      : {},
    sortBy: convertSortByFromString(sort),
    pageSize: PRODUCTS_PER_PAGE,
  };

  if (!user && loginForProducts) {
    return <LoginToViewProducts />;
  }

  return (
    <>
      {
        children({
          variables,
        })
      }
    </>
  );
};

export default ProductsListViewProps;
