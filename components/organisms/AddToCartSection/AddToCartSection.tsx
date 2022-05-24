import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, Button } from "@mui/material";

import { commonMessages } from "deprecated/intl";
import { ICheckoutModelLine } from "@nautical/helpers";
import {
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@nautical/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";
import RatingStars from "components/atoms/RatingStars";
// import { ViewSizeGuideButton } from "@components/molecules/ViewSizeGuideButton/ViewSizeGuideButton";
import { useAuth } from "@nautical/react";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "components/providers/Overlay/context";
import { useShopContext } from "components/providers/ShopProvider";
import { AddToWishlist } from "components/organisms/AddToWishlist";
import { IItems } from "@nautical/api/Cart/types";
import { ProductDetailsFragment } from "@generated";

import {
  getAvailableQuantity,
  getProductPrice,
  canAddToCart,
} from "./stockHelpers";
import * as S from "./styles";

// import ProductVariantPicker from "../ProductVariantPicker";
// import { QuantityInput } from "components/molecules/QuantityInput";

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetailsFragment["variants"];
  name: string;
  productPricing: ProductDetailsFragment["pricing"];
  items: IItems;
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string | undefined;
  sizeGuideUrl?: string;

  setVariantId(variantId: string): void;

  onAddToCart(variantId: string, quantity?: number): void;

  onAttributeChangeHandler(slug: string | null, value: string): void;

  scrollToRatingsAndReviewsSection: () => void;
}

const AddToCartSection: React.FC<IAddToCartSection> = ({
  availableForPurchase,
  isAvailableForPurchase,
  items,
  name,
  productId,
  productPricing,
  productVariants,
  queryAttributes,
  onAddToCart,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
  sizeGuideUrl,
  scrollToRatingsAndReviewsSection,
}) => {
  const intl = useIntl();

  const { loginForPrice } = useShopContext();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);
  const [variantStock, setVariantStock] = useState<number>(0);
  const [variantPricing, setVariantPricing] =
    useState<ProductDetails_product_variants_pricing | null>(null);

  const availableQuantity = getAvailableQuantity(
    items,
    variantId,
    variantStock
  );
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

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ): undefined => {
    if (!selectedVariant) {
      setVariantId("");
      setVariantPricing(null);
      setVariantStock(0);
      return;
    }
    setVariantId(selectedVariant.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
  };

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
      <S.VariantPicker>
        TODO: Product Variant Picker
        {/*<ProductVariantPicker*/}
        {/*  productVariants={productVariants}*/}
        {/*  onChange={onVariantPickerChange}*/}
        {/*  selectSidebar*/}
        {/*  queryAttributes={queryAttributes}*/}
        {/*  onAttributeChangeHandler={onAttributeChangeHandler}*/}
        {/*/>*/}
      </S.VariantPicker>
      <S.QuantityInput>
        TODO: Quantity input
        {/*<QuantityInput*/}
        {/*  quantity={quantity}*/}
        {/*  maxQuantity={availableQuantity}*/}
        {/*  disabled={isOutOfStock || isNoItemsAvailable}*/}
        {/*  onQuantityChange={setQuantity}*/}
        {/*  hideErrors={!variantId || isOutOfStock || isNoItemsAvailable}*/}
        {/*  testingContext="addToCartQuantity"*/}
        {/*/>*/}
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
          TODO: ViewSizeGuideButton
          {/*<ViewSizeGuideButton sizeGuideUrl={sizeGuideUrl} />*/}
        </S.WishlistButton>
      )}
    </S.AddToCartSelection>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
