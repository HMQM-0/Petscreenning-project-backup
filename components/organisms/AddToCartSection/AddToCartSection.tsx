import React, { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, Button } from "@mui/material";

import ProductVariantPicker, { IProductVariantPickerProps } from "components/organisms/ProductVariantPicker";
import { commonMessages } from "deprecated/intl";
import RatingStars from "components/atoms/RatingStars";
import { ViewSizeGuideButton } from "components/organisms/ViewSizeGuideButton";
import { useAuth } from "@nautical/react";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "components/providers/Overlay/context";
import { useShopContext } from "components/providers/ShopProvider";
import { AddToWishlist } from "components/organisms/AddToWishlist";
import { IItems } from "@nautical/api/Cart/types";
import { QuantityInput } from "components/molecules/QuantityInput";
import { ProductDetailsFragment } from "components/templates/ProductPage/queries.graphql.generated";

import {
  getAvailableQuantity,
  getProductPrice,
  canAddToCart,
} from "./stockHelpers";
import * as S from "./styles";


const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetailsFragment["variants"];
  name: string;
  productPricing: ProductDetailsFragment["pricing"];
  items: IItems;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string | undefined;
  sizeGuideUrl?: string;

  onAddToCart(variantId: string, quantity?: number): void;

  onVariantChangeHandler: IProductVariantPickerProps["onVariantChangeHandler"];

  scrollToRatingsAndReviewsSection: () => void;
}

const AddToCartSection = ({
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  productId,
  productPricing,
  productVariants,
  onAddToCart,
  onVariantChangeHandler,
  variantId,
  sizeGuideUrl,
  scrollToRatingsAndReviewsSection,
}: IAddToCartSection) => {
  const intl = useIntl();

  const { loginForPrice } = useShopContext();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);

  const selectedVariant = useMemo(
    () => productVariants?.find((variant) => variant!.id === variantId),
    [productVariants, variantId]
  );

  const variantStock = selectedVariant?.quantityAvailable || 0;
  const variantPricing = selectedVariant?.pricing;

  const availableQuantity = getAvailableQuantity(items, variantId, variantStock);
  const isOutOfStock = !!variantId && variantStock === 0;
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;
  const isLowStock =
    !!variantId &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < LOW_STOCK_QUANTITY;

  const disableButton =
    !canAddToCart(
      items,
      !!isAvailableForPurchase,
      variantId,
      variantStock,
      quantity
    ) ||
    (!user && loginForPrice);

  const renderErrorMessage = (message: string, testingContextId: string) => (
    <S.ErrorMessage data-test="stockErrorMessage">{message}</S.ErrorMessage>
  );

  return (
    <S.AddToCartSelection>
      <S.RatingsWrapper>
        <S.ProductNameHeader data-test="productName">
          {name}
        </S.ProductNameHeader>
        <RatingStars
          productId={productId}
          scrollToRatingsAndReviewsSection={scrollToRatingsAndReviewsSection}
        />
      </S.RatingsWrapper>
      {isOutOfStock ? (
        renderErrorMessage(
          intl.formatMessage(commonMessages.outOfStock),
          "outOfStock"
        )
      ) : (
        <S.ProductPricing>
          {!user && loginForPrice ? (
            <OverlayContext.Consumer>
              {(overlayContext) => (
                <Box style={{ marginBottom: "20px" }}>
                  <button
                    className="products-login-button"
                    onClick={() =>
                      overlayContext.show(OverlayType.login, OverlayTheme.right)
                    }
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
      renderErrorMessage(
        intl.formatMessage(commonMessages.noPurchaseAvailable),
        "notAvailable"
      )}
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
      {isLowStock &&
      renderErrorMessage(
        intl.formatMessage(commonMessages.lowStock),
        "lowStockWarning"
      )}
      {isNoItemsAvailable &&
      renderErrorMessage(
        intl.formatMessage(commonMessages.noItemsAvailable),
        "noItemsAvailable"
      )}
      {!!productVariants?.length && (
        <S.VariantPicker>
          <ProductVariantPicker
            // TODO: A BE issue. productVariants can not contain null
            // @ts-ignore
            productVariants={productVariants}
            onVariantChangeHandler={onVariantChangeHandler}
          />
        </S.VariantPicker>
      )}
      <S.QuantityInput>
        <QuantityInput
          quantity={quantity}
          maxQuantity={availableQuantity}
          disabled={isOutOfStock || isNoItemsAvailable}
          onQuantityChange={setQuantity}
          hideErrors={!variantId || isOutOfStock || isNoItemsAvailable}
          testingContext="addToCartQuantity"
        />
      </S.QuantityInput>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => {
          // VariantId is set here since it is checked in disableButton
          onAddToCart(variantId!, quantity);
          setQuantity(0);
        }}
        disabled={!!disableButton}
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
