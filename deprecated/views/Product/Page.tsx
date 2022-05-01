import clsx from "clsx";
import * as React from "react";
import Media from "react-media";
import { Box } from "@mui/material";
import { useAlert } from "react-alert";

import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import { ProductDescription as NewProductDescription } from "deprecated/_nautical/components/ProductDescription";
import NoHomeBreadcrumbs from "deprecated/components/NoHomeBreadcrumbs";
import { useShopContext } from "components/providers/ShopProvider";

import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import { IProps } from "./types";

import {
  Breadcrumbs,
  // OverlayContext,
  // OverlayTheme,
  // OverlayType,
} from "../../components";
import {
  generateCategoryUrl,
  generateMicrositeUrl,
  generateProductUrl,
  isMicrosite,
} from "../../core/utils";
import { structuredData } from "../../core/SEO/Product/structuredData";

// import { useAlert } from "react-alert";

const populateBreadcrumbs = (product) => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  },
];

const populateMicrositeBreadcrumbs = (micrositeId, micrositeName) => [
  {
    link: generateMicrositeUrl(micrositeId, micrositeName),
    value: "Back",
  },
];

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
  }
> = ({
  add,
  microsite,
  product,
  items,
  queryAttributes,
  onAttributeChangeHandler,
}) => {
  // const overlayContext = React.useContext(OverlayContext);
  // const alert = useAlert();
  const alert = useAlert();
  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();
  const ratingsAndReviewsSectionRef: React.RefObject<HTMLDivElement> =
    React.useRef(null);

  const scrollToRatingsAndReviewsSection = () => {
    ratingsAndReviewsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [variantId, setVariantId] = React.useState(product.defaultVariant?.id);

  const { builderKey } = useShopContext();

  /* const showCarousel = () => {
    return this.props.product.images.length > 1;
  } */

  const getSizeGuide = () => {
    const sizeGuide = product.images.find((image) =>
      image.url.substring(image.url.lastIndexOf("/") + 1).includes("sizeguide-")
    );
    if (sizeGuide && sizeGuide !== undefined) {
      return sizeGuide.url;
    }
    return null;
  };

  const getImages = () => {
    if (product.variants && variantId) {
      const variant = product.variants.find(
        (variant) => variant.id === variantId
      );

      if (variant.images.length > 0) {
        return variant.images.filter((image) => {
          if (
            image.url
              .substring(image.url.lastIndexOf("/") + 1)
              .includes("sizeguide-")
          ) {
            return false;
          }
          return true;
        });
      }
    }

    return product.images.filter((image) => {
      if (
        image.url
          .substring(image.url.lastIndexOf("/") + 1)
          .includes("sizeguide-")
      ) {
        return false;
      }
      return true;
    });
  };

  const handleAddToCart = (variantId, quantity) => {
    add(variantId, quantity);
    // NOTE: DO NOT WANT TO SHOW CART OVERLAY EVERY TIME NEW ITEM IS ADDED, JUST
    // SHOW A NOTIFICATION THAT ITEM WAS ADDED
    // overlayContext.show(OverlayType.cart, OverlayTheme.right);
    alert.show(
      {
        title: "Added " + quantity + "x " + product.name,
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
      isAvailableForPurchase={product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
      sizeGuideUrl={getSizeGuide()}
      scrollToRatingsAndReviewsSection={scrollToRatingsAndReviewsSection}
    />
  );

  return (
    <Box className="product-page">
      <Box className="container">
        {!!isMicrosite() ? (
          <NoHomeBreadcrumbs
            breadcrumbs={populateMicrositeBreadcrumbs(
              microsite.id,
              microsite.name
            )}
          />
        ) : (
          <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
        )}
      </Box>
      <Box className="container">
        <Box className="product-page__product">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <Media query={{ maxWidth: "540px" }}>
            {(matches) =>
              matches ? (
                <>
                  <GalleryCarousel images={getImages()} />
                  <Box className="product-page__product__info">
                    {addToCartSection}
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    className="product-page__product__gallery"
                    ref={productGallery}
                  >
                    <ProductGallery images={getImages()} />
                  </Box>
                  <Box className="product-page__product__info">
                    <Box className={clsx("product-page__product__info--fixed")}>
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
        <Box className="product-page__product__description">
          <NewProductDescription
            descriptionJson={product.descriptionJson}
            attributes={product.attributes}
            features={product.features}
            productId={product.id}
            ratingsAndReviewsSectionRef={ratingsAndReviewsSectionRef}
          />
        </Box>
      </Box>
      {!!!isMicrosite() &&
        (builderKey ? (
          // @ts-ignore
          <OtherProducts products={product.category.productList.products} />
        ) : (
          // @ts-ignore
          <OtherProducts products={product.category.products.edges} />
        ))}
    </Box>
  );
};

export default Page;
