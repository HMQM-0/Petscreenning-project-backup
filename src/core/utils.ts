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

export const getDBIdFromGraphqlId = (graphqlId: string, schema?: string): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)?/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr?.[1]) {
    console.error("Schema is not correct");
  }
  return parseInt(arr?.[2] ?? "", 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string => Base64.encode(`${schema}:${id}`);

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
  return IS_SERVER_SIDE ? false : Boolean(window.location.pathname.match(/\/site\/[^/]+\/[0-9]+/g));
}

export function getMicrositeId() {
  if (!IS_SERVER_SIDE) {
    const href = window.location.href;
    return getGraphqlIdFromDBId(/\/site\/[^/]+\/([0-9]+)/.exec(href)?.[1] ?? "".trim().replace(/\//g, ""), "Microsite");
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

export const convertToAttributeScalar = (attributes: AttributeDict | Attribute) =>
  Object.entries(attributes)
    .map(([key, value]) => value.map((attribute: any) => ({ slug: key, value: attribute })))
    .reduce((prev, curr) => [...prev, ...curr], []);

/**
 * @deprecated
 * Does not make sense to have this as a separate util.
 * Use `typeof ... === 'undefined'`, `??`, `||` etc. instead
 */
export const getValueOrEmpty = <T>(value: T): T | string => (value === undefined || value === null ? "" : value);

export const convertSortByFromString = (sortBy: string | undefined | null) => {
  if (!sortBy) {
    return null;
  }
  const direction = sortBy.startsWith("-") ? OrderDirection.Desc : OrderDirection.Asc;

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

export const isMobileView = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
};
