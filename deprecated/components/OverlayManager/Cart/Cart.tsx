import * as React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router-dom";
import { Box } from "@mui/material";
import Link from "next/link";

import { TaxedMoney } from "@components/containers";
import { commonMessages } from "deprecated/intl";
import { useAuth, useCart, useCheckout } from "@nautical/react";
import {
  generateMicrositeUrl,
  getDBIdFromGraphqlId,
  getMicrositeId,
  getMicrositeSlug,
  isMicrosite,
} from "core/utils";
import Offline from "deprecated/components/Offline/index";
import OfflinePlaceholder from "deprecated/components/OfflinePlaceholder";
import Online from "deprecated/components/Online/index";
import Overlay from "deprecated/components/Overlay/Overlay";
import { OverlayContextInterface } from "components/providers/Overlay/context";
import { Cart as CartImg } from "components/icons/cart";
import { X as CloseImg } from "components/icons/x";

import ProductList from "./ProductList";
import Empty from "./Empty";
import classes from "./scss/index.module.scss";

import Button from "../../Button";
import {
  cartUrl,
  checkoutLoginUrl,
  checkoutUrl,
  micrositeCartUrl,
} from "../../../app/routes";
import Loader from "../../Loader";

interface CartProps {
  overlay: OverlayContextInterface;
}

const Cart = ({ overlay }: CartProps) => {
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    items,
    removeItem,
    subtotalPrice,
    shippingPrice,
    discount,
    totalPrice,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
        gross: shippingPrice,
        net: shippingPrice,
      }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const missingVariants = () => {
    return items?.find((item) => !item.variant || !item.totalPrice);
  };

  const itemsQuantity =
    items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0;

  const micrositeURL = isMicrosite() ? generatePath(micrositeCartUrl, {
    micrositeId: String(getDBIdFromGraphqlId(getMicrositeId()!, "Microsite")),
    micrositeSlug: getMicrositeSlug(),
  }) : "";
  const cartURL = generatePath(cartUrl, {});

  return (
    <Overlay testingContext="cartOverlay" context={overlay}>
      <Online>
        <Box className={classes.cart}>
          <Box className="overlay__header">
            <CartImg
              // TODO: How to pass className with the new component structure?
              // @ts-ignore
              className="overlay__header__cart-icon"
            />
            <Box className="overlay__header-text">
              <FormattedMessage defaultMessage="My cart," />{" "}
              <Box component="span" className="overlay__header-text-items">
                <FormattedMessage
                  defaultMessage="{itemsQuantity,plural,one{{itemsQuantity} item} other{{itemsQuantity} items}}"
                  description="items quantity in cart"
                  values={{
                    itemsQuantity,
                  }}
                />
              </Box>
            </Box>
            <button
              onClick={overlay.hide}
              className="overlay__header__close-icon"
            >
              <CloseImg />
            </button>
          </Box>
          {items?.length ? (
            <>
              {missingVariants() ? (
                <Loader full />
              ) : (
                <>
                  <ProductList lines={items} remove={removeItem} />
                  <Box className={classes.cart__footer}>
                    <Box className={classes.cart__footer__price}>
                      <Box component="span">
                        <FormattedMessage {...commonMessages.subtotal} />
                      </Box>
                      <Box component="span">
                        <TaxedMoney
                          data-test="subtotalPrice"
                          taxedMoney={subtotalPrice}
                        />
                      </Box>
                    </Box>

                    {shippingTaxedPrice &&
                    shippingTaxedPrice.gross.amount !== 0 && (
                      <Box className={classes.cart__footer__price}>
                        <Box component="span">
                          <FormattedMessage {...commonMessages.shipping} />
                        </Box>
                        <Box component="span">
                          <TaxedMoney
                            data-test="shippingPrice"
                            taxedMoney={shippingTaxedPrice}
                          />
                        </Box>
                      </Box>
                    )}

                    {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                      <Box className={classes.cart__footer__price}>
                        <Box component="span">
                          <FormattedMessage {...commonMessages.promoCode} />
                        </Box>
                        <Box component="span">
                          <TaxedMoney
                            data-test="promoCodePrice"
                            taxedMoney={promoTaxedPrice}
                          />
                        </Box>
                      </Box>
                    )}

                    <Box className={classes.cart__footer__price}>
                      <Box component="span">
                        <FormattedMessage {...commonMessages.total} />
                      </Box>
                      <Box component="span">
                        <TaxedMoney
                          data-test="totalPrice"
                          taxedMoney={totalPrice}
                        />
                      </Box>
                    </Box>

                    <Box className={classes.cart__footer__button}>
                      <Link href={isMicrosite() ? micrositeURL : cartURL}>
                        <a>
                          <Button testingContext="gotoBagViewButton" secondary>
                            <FormattedMessage defaultMessage="Go to my cart" />
                          </Button>
                        </a>
                      </Link>
                    </Box>
                    <Box className={classes.cart__footer__button}>
                      <Link
                        href={
                          isMicrosite()
                            ? user
                              ? `${generateMicrositeUrl(
                                getMicrositeId()!,
                                getMicrositeSlug()
                              )}checkout/`
                              : `${generateMicrositeUrl(
                                getMicrositeId()!,
                                getMicrositeSlug()
                              )}login/`
                            : user
                              ? checkoutUrl
                              : checkoutLoginUrl
                        }
                      >
                        <a>
                          <Button testingContext="gotoCheckoutButton">
                            <FormattedMessage {...commonMessages.checkout} />
                          </Button>
                        </a>
                      </Link>
                    </Box>
                  </Box>
                </>
              )}
            </>
          ) : (
            <Empty overlayHide={overlay.hide} />
          )}
        </Box>
      </Online>
      <Offline>
        <Box className={classes.cart}>
          <OfflinePlaceholder />
        </Box>
      </Offline>
    </Overlay>
  );
};

export default Cart;
