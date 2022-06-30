import { Builder } from "@builder.io/react";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

import { useAddToCart } from "components/organisms/AddToCartSection";
import { useHandleAddToCart } from "components/templates/ProductPage/Page";
import { useSelectedVariant } from "components/templates/ProductPage/View";
import { ProductDetailsFragment } from "components/templates/ProductPage/queries.graphql.generated";
import { TaxedMoney } from "components/molecules/TaxedMoney";

type Product = Pick<ProductDetailsFragment, 'variants' | 'pricing' | 'name' | 'isAvailableForPurchase' | 'availableForPurchase'>;

export const AddToCartSection = ({ product }: { product?: Product }) => {
  if (!product || (product.variants?.length ?? 0) === 0) {
    const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;
    return isEditingOrPreviewing ? <Typography>MISSING PRODUCT BINDING</Typography> : null;
  }
  return <AddToCartSectionValidated product={product} />;
};

const AddToCartSectionValidated = ({ product }: { product: Product }) => {
  const { selectedVariant, redirectToVariant } = useSelectedVariant(product);
  const handleAddToCart = useHandleAddToCart(product);
  const { disableAddToCart } = useAddToCart(product, selectedVariant);

  const handleSelect = async () =>
    // selected variant will always be set here, since button is disabled otherwise
    await handleAddToCart(selectedVariant!.id, 1);

  const variants = product.variants ?? [];
  return (
    <>
      <TaxedMoney taxedMoney={selectedVariant?.pricing?.price} />
      <Select
        value={selectedVariant?.id}
        onChange={(event) => redirectToVariant(event.target.value as string)}
      >
        {variants.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Button
        color={"primary"}
        style={{ alignSelf: "center", width: "100%", marginBottom: 24 }}
        disabled={disableAddToCart}
        onClick={handleSelect}
        variant={"contained"}
      >
        Add to Cart
      </Button>
    </>
  );
};
