import isEqual from "lodash/isEqual";
import * as React from "react";
import { Box, Card, IconButton } from "@mui/material";
import { useAlert } from "react-alert";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useCart } from "@nautical/react";
import { Thumbnail } from "components/molecules/Thumbnail";
import pricecapImage from "deprecated/images/pricing-cap.svg";
import { AddToWishlist } from "components/organisms/AddToWishlist";
import { TaxedMoney } from "components/containers/TaxedMoney";
import { BasicProductFields } from "deprecated/views/Product/gqlTypes/BasicProductFields";
import { ProductsPageProductFragment } from "@generated";

import classes from "./scss/index.module.scss";


export interface Product extends BasicProductFields {
  seller?: {
    id: string;
    companyName: string;
  };
  defaultVariant?: {
    id: string;
  };
  category?: {
    id: string;
    name: string;
  };
  pricing: {
    priceRange: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
      stop: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
    priceRangeUndiscounted: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
      stop: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
  };
}

interface ProductListItemProps {
  loginForPrice?: boolean;
  // TODO: We might need to replace this with some other type (once this component is used on any other page)
  product: ProductsPageProductFragment;
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
  const price = product.pricing?.priceRange?.start;
  const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;
  const alert = useAlert();
  const { addItem } = useCart();

  const handleAddToCart = (event: React.MouseEvent, variantId: string | undefined, quantity: number) => {
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

  // TODO: FIX PRICING DISPLAY BUGS
  /* const price = usePrice({
    amount: product.pricing?.priceRange?.start?.net?.amount,
    baseAmount: product.pricing?.priceRangeUndiscounted?.start?.net?.amount,
    currencyCode: product?.pricing?.priceRange?.start?.net?.currency
  })

  const priceRange = usePriceRange({
    start: product?.pricing?.priceRange?.start?.net?.amount,
    stop: product?.pricing?.priceRange?.stop?.net?.amount,
    currencyCode: product?.pricing?.priceRange?.start?.net?.currency
  })

  const priceRangeUndiscounted = usePriceRange({
    start: product?.pricing?.priceRangeUndiscounted?.start?.net?.amount,
    stop: product?.pricing?.priceRangeUndiscounted?.stop?.net?.amount,
    currencyCode: product?.pricing?.priceRangeUndiscounted?.start?.net?.currency
  }) */

  const pricecap = {
    backgroundImage: `url(${pricecapImage})`,
    backgroundRepeat: "no-repeat",
    height: 30,
  };

  const getProductPrice = () => {
    if (loginForPrice) {
      return (
        <>
          <Box className={classes['product-list-priceblock']}>Login for price</Box>
          <Box className={classes['product-list-cart']} style={pricecap}>
            <AddCircleIcon />
          </Box>
        </>
      );
    }

    if (isEqual(price, priceUndiscounted)) {
      return (
        <>
          <Box
            className={classes['product-list-priceblock']}
            mt={1}
            style={{ textAlign: "left" }}
          >
            <TaxedMoney taxedMoney={price} />
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
    } else {
      return (
        <>
          <Box
            className={classes['product-list-priceblock']}
            mt={1}
            style={{ textAlign: "left" }}
          >
            <TaxedMoney taxedMoney={price} />
            &nbsp;&nbsp;
            <Box component="span" className={classes['product-list-price-undiscounted']}>
              <TaxedMoney taxedMoney={priceUndiscounted} />
            </Box>
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
    }
  };

  return (
    <>
      <Card variant="outlined">
        <Box
          className={
            wide ? classes['product-list-wrapper-wide'] : classes['product-list-wrapper']
          }
        >
          <Box style={{ position: "absolute" }}>
            <AddToWishlist productId={product.id} showButtonText={false} />
          </Box>
          <Box
            className={wide ? classes['product-list-image-wide'] : classes['product-list-image']}
          >
            <Thumbnail source={product} height="255" width="255" />
          </Box>
          <h4 className={classes['product-list-title']}>{product.name}</h4>
          <p className={classes['product-list-seller']}>{seller}</p>
          <p className={classes['product-list-category']}>{category?.name}</p>
          <Box style={{ position: "relative" }}>{getProductPrice()}</Box>
        </Box>
      </Card>
    </>
  );
};

export default ProductListItem;
