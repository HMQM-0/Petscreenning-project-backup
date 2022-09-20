import { BuilderComponent } from "@builder.io/react";
import React from "react";
import { BuilderContent } from "@builder.io/sdk";

import { useProductVariantAttributes } from "src/components/organisms/ProductVariantPicker";
import { useVariantImages } from "src/components/templates/ProductPage/Page";
import { useAddToCart } from "src/components/organisms/AddToCartSection";
import builderConfig from "src/config/builder";
import useBuilderStateData from "src/components/hooks/useBuilderStateData";

import { ProductDetailsFragment, ProductVariantFieldsFragment } from "./queries.graphql.generated";

const Builder = ({
  content,
  product,
  selectedVariant,
  onVariantChange,
}: {
  content: BuilderContent;
  product: ProductDetailsFragment;
  selectedVariant: ProductVariantFieldsFragment | undefined;
  onVariantChange: (variantId: string | undefined) => void;
}) => {
  const stateData = useBuilderStateData({ product });
  const {
    quantity,
    setQuantity,
    disableAddToCart,
    isOutOfStock,
    isLowStock,
    isNoItemsAvailable,
    purchaseAvailableDate,
    noPurchaseAvailable,
  } = useAddToCart(product, selectedVariant);

  const variantImages = useVariantImages(product, selectedVariant);

  const { allAttributesById, selectedAttributeValues } = useProductVariantAttributes(product.variants ?? []);

  return (
    <BuilderComponent
      model={builderConfig.storeModel}
      content={content}
      data={{
        ...stateData,
        product: {
          ...stateData.product,
          selectedVariant,

          // From useAddToCart
          quantity,
          setQuantity,
          disableAddToCart,
          noPurchaseAvailable,
          purchaseAvailableDate,
          outOfStock: isOutOfStock,
          lowStock: isLowStock,
          noItemsAvailable: isNoItemsAvailable,
          // From useVariantImages
          variantImages,
          selectedImage: variantImages[0]?.url,
          // From useProductVariantAttributes
          allAttributesById,
          selectedAttributeValues,

          // TODO: Do we need these on Builder.io? Just leave those without `Object.values` ?
          productVariantAttributes: Object.values(allAttributesById),
          productVariantsAttributesSelectedValues: Object.values(selectedAttributeValues),

          // TODO: how to deprecate this one and force using disableAddToCart instead on Builder.io side?
          disableButton: disableAddToCart,
        },
        variantSelect: onVariantChange,
      }}
    />
  );
};

export { Builder };
