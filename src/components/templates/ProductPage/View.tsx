import { BuilderContent } from "@builder.io/sdk";
import _keyBy from "lodash/keyBy";
import _mapKeys from "lodash/mapKeys";
import _mapValues from "lodash/mapValues";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";

import { useShopContext } from "src/components/providers/ShopProvider";
import { Builder } from "src/components/templates/ProductPage/Builder";
import { useAuth } from "nautical-api";
import { useNetworkStatus } from "src/components/hooks";
import NotFound from "src/components/molecules/NotFound";
import OfflinePlaceholder from "src/components/atoms/OfflinePlaceholder";
import LoginToViewProducts from "src/components/organisms/LoginToViewProducts/LoginToViewProducts";

import Page from "./Page";
import { ProductDetailsFragment } from "./queries.graphql.generated";

export const useSelectedVariant = (product: Pick<ProductDetailsFragment, "variants">) => {
  const router = useRouter();

  const redirectToVariant = useCallback(
    (variantId: string) => {
      const selectedVariant =
        // variants should not be empty here. A BE issue?
        product.variants?.find((variant) => variant.id === variantId);

      return router.replace(
        {
          query: {
            ...router.query,
            ..._mapValues(
              _keyBy(selectedVariant?.attributes, "attribute.slug"),
              (attributeItem) => attributeItem.values[0]?.value,
            ),
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [product.variants, router],
  );

  const selectedVariant = useMemo(() => {
    // There should be a better way
    const searchQueryAttributes = _mapKeys(router.query, (value, key) => key?.toString().toLowerCase());

    return product.variants?.find((productVariant) =>
      productVariant.attributes.every((productVariantAttribute) => {
        const slug = productVariantAttribute.attribute.slug;
        // There exists the possibility that the DB will not be consistent, and that we won't necessarily have an attribute value.
        const productVariantAttributeValue = productVariantAttribute.values[0]?.value ?? "";

        return productVariantAttributeValue === searchQueryAttributes[slug];
      }),
    );
  }, [product.variants, router.query]);

  return {
    selectedVariant,
    redirectToVariant,
  };
};

type ViewProps = {
  product: ProductDetailsFragment;
  builderContent: BuilderContent | null;
};

const View = ({ product, builderContent }: ViewProps) => {
  const { user } = useAuth();
  const { loginForProducts } = useShopContext();
  const { online: isOnline } = useNetworkStatus();

  const { selectedVariant, redirectToVariant } = useSelectedVariant(product);

  useEffect(() => {
    if (!selectedVariant) {
      if (!product.defaultVariant) {
        // Default variant should always be set.
        // But adding a check to prevent infinite redirect in case of bad DB state
        return;
      }
      redirectToVariant(product.defaultVariant!.id);
      return;
    }
  }, [redirectToVariant, selectedVariant, product.defaultVariant]);

  if (!user && loginForProducts) {
    return <LoginToViewProducts />;
  }

  if (!product) {
    return <NotFound />;
  }

  if (!isOnline) {
    return <OfflinePlaceholder />;
  }

  const onVariantChangeHandler = (variantId: string | undefined) => {
    // BE issue. Default variant should not be empty
    const selectedVariantId = variantId || product.defaultVariant!.id;
    return redirectToVariant(selectedVariantId);
  };

  if (builderContent) {
    return (
      <Builder
        product={product}
        content={builderContent}
        selectedVariant={selectedVariant}
        onVariantChange={onVariantChangeHandler}
      />
    );
  }

  return (
    <Page
      product={product}
      selectedVariant={selectedVariant}
      onVariantChange={onVariantChangeHandler}
    />
  );
};

export default View;
