// import { History, LocationState } from "history";
// import { History } from "history";
import { Base64 } from "js-base64";
import { GetServerSidePropsContext } from "next";
import { isString } from "lodash";

import { Attribute, OrderDirection, ProductOrderField } from "@generated";
import { FilterQuerySet } from "components/templates/ProductsList/View";
// import { each } from "lodash";
// import {
//   parse as parseQs,
//   stringify as stringifyQs,
//   ParsedQuery,
// } from "query-string";
// import { FetchResult } from "@apollo/client";

// import { FormError } from "./types";

// import { OrderDirection, ProductOrderField } from "../../gqlTypes/globalTypes";

const IS_SERVER_SIDE = typeof window === "undefined";

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)?/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr?.[1]) {
    console.error("Schema is not correct");
  }
  return parseInt(arr?.[2] ?? "", 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
  // This is temporary solution, we will use slugs in the future
  Base64.encode(`${schema}:${id}`);

export const priceToString = (
  price: { amount: number; currency: string },
  locale?: string
): string => {
  const { amount } = price;
  if (locale) {
    return amount.toLocaleString(locale, {
      currency: price.currency,
      style: "currency",
    });
  }
  return `${price.currency} ${amount.toFixed(2)}`;
};

export const generateProductsUrl = () => `/products/`;

export const generateProductUrl = (id: string, name: string) =>
  `/product/${slugify(name)}/${id}/`;

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${id}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/collection/${slugify(name)}/${id}/`;

export const generateMicrositeUrl = (id: string, name: string) =>
  `/site/${slugify(name)}/${getDBIdFromGraphqlId(id, "Microsite")}/`;

export function isMicrosite() {
  return IS_SERVER_SIDE
    ? false
    : Boolean(window.location.pathname.match(/\/site\/[^/]+\/[0-9]+/g));
}

export function getMicrositeId() {
  if (!IS_SERVER_SIDE) {
    const href = window.location.href;
    return getGraphqlIdFromDBId(
      /\/site\/[^/]+\/([0-9]+)/.exec(href)?.[1] ?? "".trim().replace(/\//g, ""),
      "Microsite"
    );
  }
  return "";
}

export function getMicrositeSlug() {
  const href = IS_SERVER_SIDE ? "" : window.location.href;
  return /\/site\/([^/]+)\/[0-9]+/.exec(href)?.[1] ?? "";
}

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

interface AttributeDict {
  [attributeSlug: string]: string[];
}

export const convertToAttributeScalar = (
  attributes: AttributeDict | Attribute
) =>
  Object.entries(attributes)
    .map(([key, value]) =>
      value.map((attribute: any) => ({ slug: key, value: attribute }))
    )
    .reduce((prev, curr) => [...prev, ...curr], []);

interface QueryString {
  [key: string]: string[] | string | null | undefined;
}

export const getAttributesFromQs = (qs: QueryString) =>
  Object.keys(qs)
    .filter(
      (key) =>
        !["pageSize", "priceGte", "priceLte", "sortBy", "q"].includes(key)
    )
    .reduce((prev: any, curr: any) => {
      prev[curr] = typeof qs[curr] === "string" ? [qs[curr]] : qs[curr];
      return prev;
    }, {});

export const getValueOrEmpty = <T>(value: T): T | string =>
  value === undefined || value === null ? "" : value;

export const convertSortByFromString = (sortBy: string | undefined | null) => {
  if (!sortBy) {
    return null;
  }
  const direction = sortBy.startsWith("-")
    ? OrderDirection.Desc
    : OrderDirection.Asc;

  let field;
  switch (sortBy.replace(/^-/, "")) {
    case "name":
      field = ProductOrderField.Name;
      break;

    case "price":
      field = ProductOrderField.MinimalPrice;
      break;

    case "updated_at":
      field = ProductOrderField.Date;
      break;

    default:
      return null;
  }
  return { field, direction };
};

export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

// export const parseQueryString = (
//   // location: LocationState
//   location: any
// ): ParsedQuery<string> => {
//   let query: ParsedQuery<string> = parseQs(window.location.search.substr(1));

//   each(query, (value, key) => {
//     if (Array.isArray(value)) {
//       query = {
//         ...query,
//         [key]: value[0],
//       };
//     }
//   });
//   return query;
// };

// export const updateQueryString = (
//   // location: LocationState,
//   location: any,
//   history: History
// ) => {
//   const querystring = parseQueryString(location);

//   return (key: string, value?: any) => {
//     if (value === "") {
//       delete querystring[key];
//     } else {
//       querystring[key] = value || key;
//     }
//     history.replace(`?${stringifyQs(querystring)}`);
//   };
// };

// export const findFormErrors = (result: void | FetchResult): FormError[] => {
//   if (result) {
//     const data = Object.values(maybe(() => result.data) as object);

//     return data.reduce((prevVal: any, currVal: any) => {
//       const errors = currVal.errors || [];

//       return [...prevVal, ...errors];
//     }, []);
//   }
//   return [];
// };

export const removeEmptySpaces = (text: string) => text.replace(/\s+/g, "");

export const getProductQueryVariablesFromContext = (
  context: GetServerSidePropsContext
) => {
  const { sortBy, filters, after } = context.query;
  const attributeFilters = FilterQuerySet.decode(filters);
  return {
    sortBy: convertSortByFromString(isString(sortBy) ? sortBy : null),
    attributes: attributeFilters
      ? convertToAttributeScalar(attributeFilters)
      : {},
    after: isString(after) ? after : undefined,
  };
};
