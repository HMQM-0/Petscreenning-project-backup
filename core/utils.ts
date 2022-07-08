import { Base64 } from "js-base64";

import { Attribute, OrderDirection, ProductOrderField } from "@generated";

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
  Base64.encode(`${schema}:${id}`);

export const generateUrlByGraphqlId = (graphqlId: string, name: string) => {
  const rawId = Base64.decode(graphqlId).split(":");
  let schema = rawId[0];
  const id = rawId[1];
  return `/${schema.toLowerCase()}/${slugify(name)}/${id}/`;
};

export const generateProductsUrl = () => `/products/`;

export const generateProductUrl = (id: string, name: string) =>
  `/product/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

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

/**
 * @deprecated
 * Does not make sense to have this as a separate util.
 * Use `typeof ... === 'undefined'`, `??`, `||` etc. instead
 */
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

/**
 * @deprecated
 * NEVER USE THIS ONE.
 * Use `?.`, `||`, `??` etc. instead
 */
export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const removeEmptySpaces = (text: string) => text.replace(/\s+/g, "");
