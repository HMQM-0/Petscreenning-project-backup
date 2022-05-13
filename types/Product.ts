import { ProductFilterInput } from "@generated";

interface Attributes {
  [key: string]: string[];
}

export interface ProductFilters extends Omit<ProductFilterInput, 'minimalPrice' | 'attributes'> {
  // Overriding attributes, since it is an Object (Dict) on the FE, but is sent as an Array to the BE
  attributes: Attributes;
  // TODO: pageSize is missing in generated file. Does it work on the BE?
  pageSize: number;
  // TODO: sortBy is missing in generated file. Does it work on the BE?
  sortBy?: string;
  // We use custom price fields which are then converted into `minimalPrice: { gte: ..., lte: ... }` on submit
  priceLte?: number;
  priceGte?: number;
  // TODO: after is missing in generated file. Does it work on the BE?
  after?: string;
}
