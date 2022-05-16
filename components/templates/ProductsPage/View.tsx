import * as React from "react";
import { useQueryParam, StringParam, QueryParamConfig } from 'next-query-params';

import { IFilters } from "@types";
import { useAuth } from "@nautical/react";
import { useShopContext } from "components/providers/ShopProvider";
import {
  convertSortByFromString,
  convertToAttributeScalar,
} from "core/utils";
import { PRODUCTS_PER_PAGE } from "core/config";
import { ProductsQueryVariables } from "@generated";

import LoginToViewProducts from "./components/LoginToViewProducts";
import BuilderProducts from "./components/BuilderProducts";
import Products from "./components/Products";

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

interface ProductsProps {
  logo: string;
}

export const View = ({ logo }: ProductsProps) => {
  const [sort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const [afterFilters] = useQueryParam("after", StringParam);
  const [beforeFilters] = useQueryParam("before", StringParam);
  const [firstFilters] = useQueryParam("first", StringParam);
  const [lastFilters] = useQueryParam("last", StringParam);

  const { user } = useAuth();

  const { loginForProducts, builderKey } = useShopContext();

  const variables: ProductsQueryVariables = {
    after: afterFilters,
    // TODO: before/first/last missing in type. How to set type properly?
    // @ts-ignore
    before: beforeFilters,
    first: !lastFilters && !firstFilters ? PRODUCTS_PER_PAGE : firstFilters,
    last: lastFilters,
    attributes: attributeFilters
      ? convertToAttributeScalar(attributeFilters)
      : {},
    sortBy: convertSortByFromString(sort),
    pageSize: PRODUCTS_PER_PAGE,
  };

  if (!user && loginForProducts) {
    return (<LoginToViewProducts logo={logo} />);
  }
  if (builderKey) {
    return (<BuilderProducts variables={variables} />);
  }
  return (
    <Products
      variables={variables}
      filters={{
        attributes: attributeFilters,
        sortBy: sort || undefined,
      }}
    />
  );
};

export default View;
