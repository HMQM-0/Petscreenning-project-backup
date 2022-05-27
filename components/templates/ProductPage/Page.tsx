import React, { useRef, useState } from "react";
import Media from "react-media";
import { Box } from "@mui/material";
import { useAlert } from "react-alert";
import _mapValues from "lodash/mapValues";
import _keyBy from "lodash/keyBy";
import { useRouter } from "next/router";

import AddToCartSection, { IAddToCartSection } from "components/organisms/AddToCartSection";
import { ProductDescription } from "components/molecules/ProductDescription";
import { ProductGallery } from "components/organisms/ProductGallery";
import {
  generateCategoryUrl,
  generateProductUrl,
} from "core/utils";
import Breadcrumbs from "components/atoms/Breadcrumbs";
import { ProductDetailsFragment } from "@generated";
import { IItems } from "@nautical/api/Cart/types";

import classes from "./scss/index.module.scss";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";

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

  const scrollToRatingsAndReviewsSection = () =>
    ratingsAndReviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const [variantId, setVariantId] = useState(product.defaultVariant?.id);

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
      // TODO: BE issue. images can not contain null
      image!.url.substring(image!.url.lastIndexOf("/") + 1).includes("sizeguide-")
    );
    return sizeGuide?.url || undefined;
  };

  const getVariantImages = (variantId: string) => {
    const variant = product.variants?.find(
      // TODO: BE issue. variants can not contain null
      (variant) => variant!.id === variantId
    );

    return variant?.images;
  };

  // We use variant images (if variant is set and if it has separate images)
  // Use regular images otherwise
  const images = (variantId ? getVariantImages(variantId) : []) || product.images;

  const filteredImages = images?.filter((image) =>
    // TODO: BE issue. image can not be null here
    !image!.url
      .substring(image!.url.lastIndexOf("/") + 1)
      .includes("sizeguide-")
  );

  const onVariantChangeHandler = (variantId: string | undefined) => {
    // TODO: BE issue. Default variant should not be empty
    const selectedVariantId = variantId || product.defaultVariant!.id;
    const selectedVariant =
      // TODO: variant should not be empty here. A BE issue? And variants should not contain null as well
      product.variants?.find((variant) => variant!.id === selectedVariantId);

    router.replace(
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
      setVariantId={setVariantId}
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
                  {/* // TODO: A BE issue. images can not contain null (`[null]`) */}
                  {/* @ts-ignore */}
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
                    {/* // TODO: A BE issue. images can not contain null (`[null]`) */}
                    {/* @ts-ignore */}
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
      {/* // TODO: A BE issue. products can not be empty here */}
      <OtherProducts products={product.category?.products!.edges.map(({ node }) => node) ?? []} />
    </Box>
  );
};

export default Page;
