import React, { useRef } from "react";
import Media from "react-media";
import { Box } from "@mui/material";
import { useAlert } from "react-alert";

import { useCart } from "nautical-api";
import AddToCartSection from "src/components/organisms/AddToCartSection";
import { ProductDescription } from "src/components/molecules/ProductDescription";
import { ProductGallery } from "src/components/organisms/ProductGallery";
import { generateCategoryUrl, generateProductUrl } from "src/core/utils";
import Breadcrumbs from "src/components/atoms/Breadcrumbs";

import classes from "./scss/index.module.scss";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import { ProductDetailsFragment, ProductVariantFieldsFragment } from "./queries.graphql.generated";

export const useVariantImages = (
  product: ProductDetailsFragment,
  selectedVariant: ProductVariantFieldsFragment | undefined,
) => {
  const getVariantImages = (variantId: string) => {
    const variant = product.variants?.find((variant) => variant.id === variantId);

    return variant?.images;
  };

  // We use variant images (if variant is set and if it has separate images)
  // Use regular images otherwise
  // images should not be empty. A BE issue?
  const images = (selectedVariant && getVariantImages(selectedVariant.id)) || product.images || [];

  return images.filter((image) => !image.url.substring(image.url.lastIndexOf("/") + 1).includes("sizeguide-"));
};

export const useHandleAddToCart = (product?: Pick<ProductDetailsFragment, "name">) => {
  const alert = useAlert();
  const { addItem } = useCart();
  // Adding 3rd parameter for backwards compatibility with Builder.io helper method
  return async (variantId: string, quantity: number, name?: string) => {
    await addItem(variantId, quantity);

    alert.show(
      {
        title: `Added ${quantity} x ${name || product?.name || "product(s)"}`,
      },
      { type: "success" },
    );
  };
};

export interface PageProps {
  product: ProductDetailsFragment;
  selectedVariant: ProductVariantFieldsFragment | undefined;
  onVariantChange: (variantId: string | undefined) => void;
}

const Page = ({ product, selectedVariant, onVariantChange }: PageProps) => {
  const productGallery = useRef<HTMLDivElement | undefined>();
  const ratingsAndReviewsSectionRef = useRef<HTMLDivElement | undefined>();

  const filteredImages = useVariantImages(product, selectedVariant);

  const handleAddToCart = useHandleAddToCart(product);

  const scrollToRatingsAndReviewsSection = () =>
    ratingsAndReviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const productCategory = product.category;

  const productBreadcrumbItem = {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  };

  const breadcrumbs = productCategory
    ? [
        {
          link: generateCategoryUrl(productCategory.id, productCategory.name),
          value: productCategory.name,
        },
        productBreadcrumbItem,
      ]
    : [productBreadcrumbItem];

  const addToCartSection = (
    <AddToCartSection
      selectedVariant={selectedVariant}
      product={product}
      onAddToCart={handleAddToCart}
      onVariantChangeHandler={onVariantChange}
      scrollToRatingsAndReviewsSection={scrollToRatingsAndReviewsSection}
    />
  );

  return (
    <Box className={classes["product-page"]}>
      <Box className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box className="container">
        <Box className={classes["product-page__product"]}>
          <Media query={{ maxWidth: "540px" }}>
            {(matches) =>
              matches ? (
                <>
                  <GalleryCarousel images={filteredImages} />
                  <Box className={classes["product-page__product__info"]}>{addToCartSection}</Box>
                </>
              ) : (
                <>
                  <Box
                    className={classes["product-page__product__gallery"]}
                    ref={productGallery}
                  >
                    <ProductGallery images={filteredImages} />
                  </Box>
                  <Box className={classes["product-page__product__info"]}>
                    <Box className={classes["product-page__product__info--fixed"]}>{addToCartSection}</Box>
                  </Box>
                </>
              )
            }
          </Media>
        </Box>
      </Box>
      <Box className="container">
        <Box className={classes["product-page__product__description"]}>
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
