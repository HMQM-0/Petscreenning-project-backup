import * as React from "react";
import { useQueryParam, StringParam, QueryParamConfig } from 'next-query-params';
import { useParams } from "react-router";

import { IFilters } from "@types";
import { useAuth } from "@nautical/react";
import { useShopContext } from "components/providers/ShopProvider";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
} from "core/utils";
import { PRODUCTS_PER_PAGE } from "core/config";
import { ProductsQueryVariables } from "@generated";

import LoginToViewProducts from "./components/LoginToViewProducts";
import BuilderProducts from "./components/BuilderProducts";
import Products from "./components/Products";

import { ProductFilters } from "../../../types/Product";

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
  const params = useParams();
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

  const filters: ProductFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    sortBy: sort || undefined,
  };
  const variables: ProductsQueryVariables = {
    ...filters,
    after: afterFilters,
    // TODO: since before is missing in type - it is not allowed in the API?
    // @ts-ignore
    before: beforeFilters,
    first: !lastFilters && !firstFilters ? PRODUCTS_PER_PAGE : firstFilters,
    last: lastFilters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    // TODO: id is empty here? is that expected?
    // @ts-ignore
    id: getGraphqlIdFromDBId(params.id, "Category"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  if (!user && loginForProducts) {
    return (<LoginToViewProducts logo={logo} />);
  }
  if (builderKey) {
    return (<BuilderProducts variables={variables} />);
  }
  return (
    <Products variables={variables} filters={filters} />
  );
};

export default View;
