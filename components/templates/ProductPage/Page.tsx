import React, { useCallback, useEffect, useRef, useState } from "react";
import Media from "react-media";
import { Box } from "@mui/material";
import { useAlert } from "react-alert";
import _mapValues from "lodash/mapValues";
import _keyBy from "lodash/keyBy";
import { useRouter } from "next/router";
import _mapKeys from "lodash/mapKeys";

import AddToCartSection from "components/organisms/AddToCartSection";
import { ProductDescription } from "components/molecules/ProductDescription";
import { ProductGallery } from "components/organisms/ProductGallery";
import {
  generateCategoryUrl,
  generateProductUrl,
} from "core/utils";
import Breadcrumbs from "components/atoms/Breadcrumbs";
import { IItems } from "@nautical/api/Cart/types";

import classes from "./scss/index.module.scss";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import { ProductDetailsFragment } from "./queries.graphql.generated";

export interface PageProps {
  product: ProductDetailsFragment;
  add: (variantId: string, quantity: number) => void;
  items: IItems;
}

const Page = ({
  add,
  product,
  items,
}: PageProps) => {
  const alert = useAlert();
  const productGallery = useRef<HTMLDivElement | undefined>();
  const ratingsAndReviewsSectionRef = useRef<HTMLDivElement | undefined>();
  const router = useRouter();
  // TODO: There should be a better way
  const searchQueryAttributes = _mapKeys(router.query, (value, key) => key?.toString().toLowerCase());

  const redirectToVariant = useCallback((variantId: string) => {
    const selectedVariant =
      // variants should not be empty here. A BE issue?
      product.variants?.find((variant) => variant.id === variantId);

    return router.replace(
      {
        query: {
          ...router.query,
          ..._mapValues(
            _keyBy(selectedVariant?.attributes, 'attribute.slug'),
            (attributeItem) => attributeItem.values[0]?.value
          )
        },
      },
      undefined,
      { shallow: true }
    );
  }, [product.variants, router]);

  useEffect(() => {
    // Try to find a variant that has all the query param attributes
    let suitableVariant = product.variants?.find((productVariant) =>
      productVariant.attributes.every((productVariantAttribute) => {
        const slug = productVariantAttribute.attribute.slug;
        // TODO: We expect that there will always be an attribute value (in case DB is consistent)
        const productVariantAttributeValue = productVariantAttribute.values[0]?.value;
        return productVariantAttributeValue === searchQueryAttributes[slug];
      })
    );

    if (!suitableVariant) {
      if (!product.defaultVariant) {
        // Default variant should always be set.
        // But adding a check to prevent infinite redirect in case of bad DB state
        return;
      }
      redirectToVariant(product.defaultVariant!.id);
      return;
    }

    setVariantId(suitableVariant.id);
  }, [redirectToVariant, product.variants, searchQueryAttributes, product.defaultVariant]);

  const scrollToRatingsAndReviewsSection = () =>
    ratingsAndReviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const [variantId, setVariantId] = useState<string | undefined>();

  const productCategory = product.category;

  const productBreadcrumbItem = {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  };

  const breadcrumbs = productCategory ?
    [
      {
        link: generateCategoryUrl(productCategory.id, productCategory.name),
        value: productCategory.name,
      },
      productBreadcrumbItem,
    ] : [productBreadcrumbItem];


  const getSizeGuide = () => {
    const sizeGuide = product.images?.find((image) =>
      image.url.substring(image.url.lastIndexOf("/") + 1).includes("sizeguide-")
    );
    return sizeGuide?.url || undefined;
  };

  const getVariantImages = (variantId: string) => {
    const variant = product.variants?.find(
      (variant) => variant.id === variantId
    );

    return variant?.images;
  };

  // We use variant images (if variant is set and if it has separate images)
  // Use regular images otherwise
  // images should not be empty. A BE issue?
  const images = variantId && getVariantImages(variantId) || product.images || [];

  const filteredImages = images.filter((image) =>
    !image.url
      .substring(image.url.lastIndexOf("/") + 1)
      .includes("sizeguide-")
  );

  const onVariantChangeHandler = (variantId: string | undefined) => {
    // BE issue. Default variant should not be empty
    const selectedVariantId = variantId || product.defaultVariant!.id;
    return redirectToVariant(selectedVariantId);
  };

  const handleAddToCart = (variantId: string, quantity: number) => {
    add(variantId, quantity);
    alert.show(
      {
        title: `Added ${quantity} x ${product.name}`,
      },
      { type: "success" }
    );
  };

  const addToCartSection = (
    <AddToCartSection
      items={items}
      productId={product.id}
      name={product.name}
      productVariants={product.variants}
      productPricing={product.pricing}
      variantId={variantId}
      onAddToCart={handleAddToCart}
      onVariantChangeHandler={onVariantChangeHandler}
      isAvailableForPurchase={!!product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
      sizeGuideUrl={getSizeGuide()}
      scrollToRatingsAndReviewsSection={scrollToRatingsAndReviewsSection}
    />
  );

  return (
    <Box className={classes['product-page']}>
      <Box className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box className="container">
        <Box className={classes['product-page__product']}>
          <Media query={{ maxWidth: "540px" }}>
            {(matches) =>
              matches ? (
                <>
                  <GalleryCarousel images={filteredImages} />
                  <Box className={classes['product-page__product__info']}>
                    {addToCartSection}
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    className={classes['product-page__product__gallery']}
                    ref={productGallery}
                  >
                    <ProductGallery images={filteredImages} />
                  </Box>
                  <Box className={classes['product-page__product__info']}>
                    <Box className={classes['product-page__product__info--fixed']}>
                      {addToCartSection}
                    </Box>
                  </Box>
                </>
              )
            }
          </Media>
        </Box>
      </Box>
      <Box className="container">
        <Box className={classes['product-page__product__description']}>
          <ProductDescription
            descriptionJson={product.descriptionJson}
            attributes={product.attributes}
            features={product.features}
            productId={product.id}
            ratingsAndReviewsSectionRef={ratingsAndReviewsSectionRef}
          />
        </Box>
      </Box>
      {/* // A BE issue. products can not be empty here */}
      <OtherProducts products={product.category?.products!.edges.map(({ node }) => node) ?? []} />
    </Box>
  );
};

export default Page;
