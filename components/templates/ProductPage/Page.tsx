import React, { useRef, useState } from "react";
import Media from "react-media";
import { Box } from "@mui/material";
import { useAlert } from "react-alert";

import AddToCartSection from "components/organisms/AddToCartSection";
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
  queryAttributes: Record<string, string>;
  onAttributeChangeHandler: (slug: string | null, value: string) => void;
}

const Page = ({
  add,
  product,
  items,
  queryAttributes,
  onAttributeChangeHandler,
}: PageProps) => {
  const alert = useAlert();
  const productGallery = useRef<HTMLDivElement | undefined>();
  const ratingsAndReviewsSectionRef = useRef<HTMLDivElement | undefined>();

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
      queryAttributes={queryAttributes}
      setVariantId={setVariantId}
      variantId={variantId}
      onAddToCart={handleAddToCart}
      onAttributeChangeHandler={onAttributeChangeHandler}
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
