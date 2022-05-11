import * as React from "react";
import { QueryParamConfig, StringParam, useQueryParam } from "use-query-params";
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

export const View = ({ logo }: { logo: string }) => {
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

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    // TODO: Is it expected to be null? Nothing is specified in the docs
    // @ts-ignore
    priceGte: null,
    // @ts-ignore
    priceLte: null,
    // @ts-ignore
    sortBy: sort || null,
  };
  const variables = {
    ...filters,
    after: afterFilters,
    before: beforeFilters,
    first: !lastFilters && !firstFilters ? PRODUCTS_PER_PAGE : firstFilters,
    last: lastFilters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    // TODO: id is empty here?
    // @ts-ignore
    id: getGraphqlIdFromDBId(params.id, "Category"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  // TODO: Add Layout with metadata once it is merged into main
  //     meta={{
  //       description: "All Products",
  //       title: "All Products",
  //       type: "product.products",
  //     }}

  return !user && loginForProducts ? (
    <LoginToViewProducts logo={logo} />
  ) : builderKey ? (
    <BuilderProducts variables={variables} />
  ) : (
    // TODO: Fix types
    // @ts-ignore
    <Products variables={variables} filters={filters} />
  );
};

export default View;
