// Rework this functionality once slugs are in use
// @ts-ignore
import { Base64 } from "js-base64";

// import { IItems } from "@nautical/sdk/lib/api/Cart/types";
import { IItems } from "@nautical/api/Cart/types";

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
  const regexp = /(\w+):(\d+)/;
  const [, expectedSchema, id] = regexp.exec(rawId)!;
  if (schema && schema !== expectedSchema) {
    throw new Error("Schema is not correct");
  }
  return parseInt(id, 10);
};

export const generateMicrositeUrl = (id: string, name: string) =>
  `/site/${slugify(name)}/${getDBIdFromGraphqlId(id, "Microsite")}/`;

export const generateGuestOrderDetailsUrl = (token: string) =>
  `/order-history/${token}/`;

export const generateMicrositeGuestOrderDetailsUrl = (
  token: string,
  micrositeId: string,
  micrositeName: string
) =>
  `${generateMicrositeUrl(micrositeId, micrositeName)}order-history/${token}/`;

export const checkIfShippingRequiredForProducts = (items?: IItems) =>
  items?.some(({ variant }) => variant.product?.productType.isShippingRequired);
