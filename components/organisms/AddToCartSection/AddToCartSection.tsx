import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, Button } from "@mui/material";

import ProductVariantPicker, { IProductVariantPickerProps } from "components/organisms/ProductVariantPicker";
import { commonMessages } from "core/intl";
import RatingStars from "components/atoms/RatingStars";
import { ViewSizeGuideButton } from "components/organisms/ViewSizeGuideButton";
import { useAuth, useCart } from "nautical-api";
import { OverlayContext, OverlayTheme, OverlayType } from "components/providers/Overlay/context";
import { useShopContext } from "components/providers/ShopProvider";
import { AddToWishlist } from "components/organisms/AddToWishlist";
import { QuantityInput } from "components/molecules/QuantityInput";
import {
  ProductDetailsFragment,
  ProductVariantFieldsFragment,
} from "components/templates/ProductPage/queries.graphql.generated";

import { getAvailableQuantity, getProductPrice, canAddToCart } from "./stockHelpers";
import * as S from "./styles";

export const useAddToCart = (
  product: Pick<ProductDetailsFragment, "isAvailableForPurchase" | "availableForPurchase">,
  selectedVariant: ProductVariantFieldsFragment | undefined
) => {
  const { user } = useAuth();
  const { loginForPrice } = useShopContext();
  const { items } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const variantStock = selectedVariant?.quantityAvailable || 0;
  const availableQuantity = getAvailableQuantity(items, selectedVariant?.id, variantStock);
  const isOutOfStock = !!selectedVariant && variantStock === 0;
  const isNoItemsAvailable = !!selectedVariant && !isOutOfStock && !availableQuantity;
  return {
    disableAddToCart:
      !canAddToCart(items, !!product.isAvailableForPurchase, selectedVariant?.id, variantStock, quantity) ||
      (!user && !!loginForPrice),
    quantity,
    setQuantity,
    isOutOfStock,
    isLowStock: !!selectedVariant && !isOutOfStock && !isNoItemsAvailable && availableQuantity < LOW_STOCK_QUANTITY,
    isNoItemsAvailable,
    availableQuantity,
    noPurchaseAvailable: !product.isAvailableForPurchase && !product.availableForPurchase,
    purchaseAvailableDate:
      !product.isAvailableForPurchase && product.availableForPurchase && Date.parse(product.availableForPurchase),
  };
};

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  product: Pick<
    ProductDetailsFragment,
    "id" | "name" | "images" | "isAvailableForPurchase" | "availableForPurchase" | "variants" | "pricing"
  >;
  selectedVariant: ProductVariantFieldsFragment | undefined;
  sizeGuideUrl?: string;

  onAddToCart(variantId: string, quantity?: number): void;

  onVariantChangeHandler: IProductVariantPickerProps["onVariantChangeHandler"];

  scrollToRatingsAndReviewsSection: () => void;
}

const AddToCartSection = ({
  product,
  onAddToCart,
  onVariantChangeHandler,
  selectedVariant,
  scrollToRatingsAndReviewsSection,
}: IAddToCartSection) => {
  const intl = useIntl();

  const { loginForPrice } = useShopContext();
  const { user } = useAuth();

  const productId = product.id;
  const name = product.name;
  const productPricing = product.pricing;
  const productVariants = product.variants;

  const sizeGuideUrl = product.images?.find((image) =>
    image.url.substring(image.url.lastIndexOf("/") + 1).includes("sizeguide-")
  )?.url;

  const {
    quantity,
    setQuantity,
    disableAddToCart,
    isOutOfStock,
    isLowStock,
    availableQuantity,
    isNoItemsAvailable,
    noPurchaseAvailable,
    purchaseAvailableDate,
  } = useAddToCart(product, selectedVariant);

  const variantPricing = selectedVariant?.pricing;

  const renderErrorMessage = (message: string, testingContextId: string) => (
    <S.ErrorMessage data-test="stockErrorMessage">{message}</S.ErrorMessage>
  );

  return (
    <S.AddToCartSelection>
      <S.RatingsWrapper>
        <S.ProductNameHeader data-test="productName">{name}</S.ProductNameHeader>
        <RatingStars productId={productId} scrollToRatingsAndReviewsSection={scrollToRatingsAndReviewsSection} />
      </S.RatingsWrapper>
      {isOutOfStock ? (
        renderErrorMessage(intl.formatMessage(commonMessages.outOfStock), "outOfStock")
      ) : (
        <S.ProductPricing>
          {!user && loginForPrice ? (
            <OverlayContext.Consumer>
              {(overlayContext) => (
                <Box style={{ marginBottom: "20px" }}>
                  <button
                    className="products-login-button"
                    onClick={() => overlayContext.show(OverlayType.login, OverlayTheme.right)}
                  >
                    <Box component="span" className="text">
                      Login for price
                    </Box>
                    <Box component="span" className="icon">
                      <svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="long-arrow-right"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                        height="24"
                      >
                        <path
                          fill="currentColor"
                          d="M295.515 115.716l-19.626 19.626c-4.753 4.753-4.675 12.484.173 17.14L356.78 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h344.78l-80.717 77.518c-4.849 4.656-4.927 12.387-.173 17.14l19.626 19.626c4.686 4.686 12.284 4.686 16.971 0l131.799-131.799c4.686-4.686 4.686-12.284 0-16.971L312.485 115.716c-4.686-4.686-12.284-4.686-16.97 0z"
                        />
                      </svg>
                    </Box>
                  </button>
                </Box>
              )}
            </OverlayContext.Consumer>
          ) : (
            getProductPrice(productPricing, variantPricing)
          )}
        </S.ProductPricing>
      )}
      {noPurchaseAvailable &&
        renderErrorMessage(intl.formatMessage(commonMessages.noPurchaseAvailable), "notAvailable")}
      {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
            date: new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(purchaseAvailableDate),
            time: new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
            }).format(purchaseAvailableDate),
          }),
          "timeRestrictedAvailability"
        )}
      {isLowStock && renderErrorMessage(intl.formatMessage(commonMessages.lowStock), "lowStockWarning")}
      {isNoItemsAvailable &&
        renderErrorMessage(intl.formatMessage(commonMessages.noItemsAvailable), "noItemsAvailable")}
      {!!productVariants?.length && (
        <S.VariantPicker>
          <ProductVariantPicker productVariants={productVariants} onVariantChangeHandler={onVariantChangeHandler} />
        </S.VariantPicker>
      )}
      <S.QuantityInput>
        <QuantityInput
          quantity={quantity}
          maxQuantity={availableQuantity}
          disabled={isOutOfStock || isNoItemsAvailable}
          onQuantityChange={setQuantity}
          hideErrors={!selectedVariant || isOutOfStock || isNoItemsAvailable}
          testingContext="addToCartQuantity"
        />
      </S.QuantityInput>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => {
          // VariantId is set here since it is checked in disableButton
          onAddToCart(selectedVariant!.id, quantity);
          setQuantity(0);
        }}
        disabled={!!disableAddToCart}
      >
        <FormattedMessage defaultMessage="Add to cart" />
      </Button>
      <S.WishlistButton>
        <AddToWishlist productId={productId} showButtonText={true} />
      </S.WishlistButton>
      {sizeGuideUrl && (
        <S.WishlistButton>
          <ViewSizeGuideButton sizeGuideUrl={sizeGuideUrl} />
        </S.WishlistButton>
      )}
    </S.AddToCartSelection>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
