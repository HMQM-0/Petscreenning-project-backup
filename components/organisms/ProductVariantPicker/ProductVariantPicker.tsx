import React, { useMemo } from "react";
import _groupBy from "lodash/groupBy";
import _mapValues from "lodash/mapValues";
import _flatMap from "lodash/flatMap";
import _uniqBy from "lodash/uniqBy";
import _mapKeys from "lodash/mapKeys";
import { useRouter } from "next/router";

import { AttributeValue } from "@generated";
import {
  ProductVariantFieldsFragment,
  VariantAttributeFragment,
} from "components/templates/ProductPage/queries.graphql.generated";

import * as S from "./styles";
import ProductAttributePicker from "./ProductAttributePicker";

export interface IProductVariantPickerProps {
  productVariants?: ProductVariantFieldsFragment[];
  onVariantChangeHandler: (variantId: string | undefined) => void;
}

type AttributesById = Record<VariantAttributeFragment["attribute"]["id"], VariantAttributeFragment>;

const getAttributesByIdFromVariants = (variants: ProductVariantFieldsFragment[]): AttributesById =>
  _mapValues(_groupBy(_flatMap(variants, "attributes"), "attribute.id"), (attributeGroup) => ({
    // All the attributes will be the same since those are grouped by ID, so using [0]
    ...attributeGroup[0],
    // And combining all values (unique)
    values: _uniqBy<AttributeValue>(_flatMap(attributeGroup, "values").filter(Boolean), "id"),
  }));

export const useProductVariantAttributes = (productVariants: ProductVariantFieldsFragment[]) => {
  const router = useRouter();
  const queryAttributes = _mapKeys(router.query, (value, key) => key?.toString().toLowerCase());

  const allAttributesById = useMemo<AttributesById>(
    () => getAttributesByIdFromVariants(productVariants),
    [productVariants],
  );

  const selectedAttributeValues = useMemo(
    () =>
      _mapValues(allAttributesById, (attributeData) => {
        const slug = attributeData.attribute.slug.toLowerCase();
        // Attribute should not contain multiple values.
        // So string[] is not used as default value
        return queryAttributes[slug]?.toString();
      }) ?? [],
    [queryAttributes, allAttributesById],
  );

  return {
    allAttributesById,
    selectedAttributeValues,
  };
};

const ProductVariantPicker = ({ productVariants = [], onVariantChangeHandler }: IProductVariantPickerProps) => {
  const { allAttributesById, selectedAttributeValues } = useProductVariantAttributes(productVariants);

  const onAttributeChange = (attributeId: string, value: string | null | undefined, slug: string) => {
    let selectedVariant = productVariants.find((productVariant) =>
      productVariant.attributes.every((productVariantAttribute) => {
        const productVariantAttributeId = productVariantAttribute.attribute.id;
        // We expect that there will always be an attribute value (in case DB is consistent)
        const productVariantAttributeValue = productVariantAttribute.values[0]?.value;
        return productVariantAttributeId === attributeId
          ? // For the attribute that is changing - check new value
            productVariantAttributeValue === value
          : // For all other attributes - check selected values
            productVariantAttributeValue === selectedAttributeValues[attributeId];
      }),
    );

    if (!selectedVariant) {
      // If there is no such variant -
      // just find any suitable one for the newly selected attribute value
      selectedVariant = productVariants.find((productVariant) =>
        productVariant.attributes.some(
          (attributeItem) =>
            // Find proper attribute
            attributeItem.attribute.id === attributeId &&
            // With the same value as selected
            attributeItem.values[0]?.value === value,
        ),
      );
    }

    onVariantChangeHandler(selectedVariant?.id);
  };

  return (
    <S.Wrapper>
      {Object.keys(allAttributesById).map((attributeId) => {
        const { attribute, values } = allAttributesById[attributeId];

        return (
          <ProductAttributePicker
            key={attributeId}
            attribute={attribute}
            values={values}
            productVariants={productVariants}
            selectedAttributeValues={selectedAttributeValues}
            onAttributeChange={onAttributeChange}
          />
        );
      })}
    </S.Wrapper>
  );
};

ProductVariantPicker.displayName = "ProductVariantPicker";
export default ProductVariantPicker;
