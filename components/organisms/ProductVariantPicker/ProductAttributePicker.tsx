import React, { useMemo } from "react";

import {
  ProductVariantFieldsFragment,
  VariantAttributeFragment
} from "components/templates/ProductPage/queries.graphql.generated";

import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import { ProductVariantAttributeButtons } from "./ProductVariantAttributeButtons";

export interface ProductAttributePickerProps {
  attribute: VariantAttributeFragment["attribute"],
  values: VariantAttributeFragment["values"],
  productVariants: ProductVariantFieldsFragment[],
  selectedAttributeValues: Record<string, string | null | undefined>,
  onAttributeChange: (attributeId: string, value: string | null | undefined, slug: string) => void;
}

export type AttributeOption = VariantAttributeFragment["values"][number] & {
  disabled: boolean;
  label: string | null | undefined;
};

const ProductAttributePicker = ({
  attribute,
  values,
  productVariants,
  selectedAttributeValues,
  onAttributeChange,
}: ProductAttributePickerProps) => {
  const allowedVariants = useMemo(() =>
      productVariants?.filter((productVariant) =>
        productVariant.attributes
          // Exclude current attribute from the check
          .filter((attributeItem) => attributeItem.attribute.id !== attribute.id)
          .every((attributeItem) => (
            // If attribute value is not yet - just allow anything
            !selectedAttributeValues[attributeItem.attribute.id]
            // If set - Only variants that list ALL selected attribute values are allowed
            // TODO: value should not be empty here. A BE issue
            || attributeItem.values.some(
              (valueItem) => valueItem!.value === selectedAttributeValues[attributeItem.attribute.id]
            )
          ))
      ),
    [selectedAttributeValues, productVariants, attribute.id]
  );

  // TODO: This looks so complicated. There needs to be a better way
  const allowedValues = useMemo(() =>
      allowedVariants?.flatMap(
        (variant) =>
          variant.attributes
            .filter((attributeItem) => attributeItem.attribute.id === attribute.id)
            .flatMap((attributeItem) =>
              // TODO: valueItem should not be null here. A BE issue
              attributeItem.values.map((valueItem) => valueItem!.value)
            )
      ),
    [allowedVariants, attribute.id]);

  const attributeOptions: AttributeOption[] = values
    .map((value) => {

      return {
        // TODO: A BE issue. value can not be null
        disabled: !allowedValues.includes(value!.value),
        id: value!.id,
        // TODO: A BE issue. value can not be null
        label: value!.name,
        value: value!.value!,
        extra: value!.extra!,
      };
    });

  const onSelectValueHandler = (optionValue: string | undefined | null) => {
    onAttributeChange(attribute.id, optionValue, attribute.slug!);
  };

  if (attribute.name === "Size" || attribute.name === "Color") {
    return (
      <ProductVariantAttributeButtons
        type={attribute.name}
        key={attribute.id}
        attributeOptions={attributeOptions}
        selectedValue={selectedAttributeValues[attribute.id]}
        onChangeSelection={onSelectValueHandler}
      />
    );
  }

  return (
    <ProductVariantAttributeSelect
      key={attribute.id}
      attribute={attribute}
      attributeOptions={attributeOptions}
      selectedValue={selectedAttributeValues[attribute.id]}
      onChangeSelection={onSelectValueHandler}
    />
  );
};

ProductAttributePicker.displayName = "ProductAttributePicker";
export default ProductAttributePicker;
