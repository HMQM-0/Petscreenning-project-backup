/* import {
  ProductDetails_product_variants_attributes_attribute,
  ProductDetails_product_variants_attributes_values,
} from "@nautical/sdk/lib/queries/gqlTypes/ProductDetails"; */
import {
  ProductDetails_product_variants_attributes_attribute,
  ProductDetails_product_variants_attributes_values,
} from "@nautical/queries/gqlTypes/ProductDetails";
import { ISelectOption } from "@types";

export interface IProductVariantsAttribute {
  attribute: ProductDetails_product_variants_attributes_attribute;
  values: ProductDetails_product_variants_attributes_values[];
}

export interface IProductVariantsAttributes {
  [key: string]: IProductVariantsAttribute;
}

export interface IProductVariantsAttributesSelectedValues {
  [key: string]: ProductDetails_product_variants_attributes_values | null;
}
