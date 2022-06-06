import * as React from "react";
import { Box, Card, IconButton } from "@mui/material";
import { useAlert } from "react-alert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo } from "react";

// TODO: Refactor
import { useCart } from "@nautical/react";
import { Thumbnail } from "components/molecules/Thumbnail";
import { AddToWishlist } from "components/organisms/AddToWishlist";
import ProductVariantPrice from "components/organisms/ProductVariantPrice";
import { ProductsListProductFragment } from "components/templates/ProductsList/queries.graphql.generated";

import classes from "./scss/index.module.scss";

export interface ProductListItemProps {
  loginForPrice?: boolean;
  product: Pick<ProductsListProductFragment,
    'id'
    | 'name'
    | 'variants'
    | 'seller'
    | 'category'
    | 'defaultVariant'
    | 'thumbnail'
    | 'thumbnail2x'>;
  style?: number;
  wide?: boolean;
}

const ProductListItem = ({
  loginForPrice,
  product,
  wide,
}: ProductListItemProps) => {
  const { category } = product;
  const seller = product.seller?.companyName;
  const alert = useAlert();
  const { addItem } = useCart();

  const handleAddToCart = (
    event: React.MouseEvent,
    variantId: string | undefined,
    quantity: number
  ) => {
    event.stopPropagation();
    event.preventDefault();
    // TODO: Is this an error in addItem typing? or defaultVariant can NOT be empty?
    // @ts-ignore
    addItem(variantId, quantity);
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

  const pricecap = {
    backgroundImage: `url("/images/pricing-cap.svg")`,
    backgroundRepeat: "no-repeat",
    height: 30,
  };

  const defaultVariant = useMemo(
    () =>
      product.variants?.find(
        (productVariant) =>
          product.defaultVariant?.id === productVariant.id
      ),
    [product.defaultVariant?.id, product.variants]
  );

  const getProductPrice = () => {
    if (loginForPrice) {
      return (
        <>
          <Box className={classes["product-list-priceblock"]}>Login for price</Box>
          <Box className={classes["product-list-cart"]} style={pricecap}>
            <AddCircleIcon />
          </Box>
        </>
      );
    }

    return (
      <>
        <Box
          className={classes["product-list-priceblock"]}
          mt={1}
          style={{ textAlign: "left" }}
        >
          <ProductVariantPrice pricing={defaultVariant?.pricing} />
        </Box>
        <Box>
          <Box style={{ position: "absolute", right: 0, bottom: -8 }}>
            <IconButton
              color="primary"
              onClick={(event) => {
                handleAddToCart(event, product.defaultVariant?.id, 1);
              }}
              aria-label="Add to Cart"
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Card variant="outlined">
        <Box
          className={
            wide
              ? classes["product-list-wrapper-wide"]
              : classes["product-list-wrapper"]
          }
        >
          <Box style={{ position: "absolute" }}>
            <AddToWishlist productId={product.id} showButtonText={false} />
          </Box>
          <Box
            className={
              wide
                ? classes["product-list-image-wide"]
                : classes["product-list-image"]
            }
          >
            <Thumbnail source={product} height="255" width="255" />
          </Box>
          <h4 className={classes["product-list-title"]}>{product.name}</h4>
          <p className={classes["product-list-seller"]}>{seller}</p>
          <p className={classes["product-list-category"]}>{category?.name}</p>
          <Box style={{ position: "relative" }}>{getProductPrice()}</Box>
        </Box>
      </Card>
    </>
  );
};

export default ProductListItem;
