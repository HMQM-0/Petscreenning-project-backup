import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import _sumBy from "lodash/sumBy";

import { calculateTax } from "src/components/molecules/TaxedMoney/calculateTax";
import { Money } from "src/components/atoms/Money";
import { useCart, useCheckout, useAuth } from "nautical-api";
import { TaxedMoney } from "src/components/molecules/TaxedMoney";
import { commonMessages } from "src/core/intl";
import { OverlayContextInterface } from "src/components/providers/Overlay/context";
import OfflinePlaceholder from "src/components/atoms/OfflinePlaceholder";
import { useNetworkStatus } from "src/components/hooks";

import ProductList from "./ProductList";
import Empty from "./Empty";
import classes from "./scss/index.module.scss";

import overlayClasses from "../Overlay/scss/index.module.scss";
import Overlay from "../Overlay/Overlay";

interface CartProps {
  overlay: OverlayContextInterface;
}

const Cart = ({ overlay }: CartProps) => {
  const { user } = useAuth();
  const { shippingMethod } = useCheckout();
  const { items, removeItem, subtotalPrice, shippingPrice, discount, totalPrice } = useCart();
  const { online: isOnline } = useNetworkStatus();

  const { hide } = overlay;

  const shippingTaxedPrice =
    shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const itemsQuantity = items ? _sumBy(items, "quantity") : 0;

  return (
    <Overlay
      testingContext="cartOverlay"
      context={overlay}
    >
      <Box className={classes.cart}>
        {isOnline ? (
          <>
            <Box className={overlayClasses.overlay__header}>
              <LocalMallIcon
                className={overlayClasses["overlay__header__cart-icon"]}
                color="secondary"
              />
              <Box className={overlayClasses["overlay__header-text"]}>
                <FormattedMessage defaultMessage="My cart," />{" "}
                <Box
                  component="span"
                  className={overlayClasses["overlay__header-text-items"]}
                >
                  <FormattedMessage
                    defaultMessage="{itemsQuantity,plural,one{{itemsQuantity} item} other{{itemsQuantity} items}}"
                    description="items quantity in cart"
                    values={{
                      itemsQuantity,
                    }}
                  />
                </Box>
              </Box>
              <CloseIcon
                onClick={hide}
                className={overlayClasses["overlay__header__close-icon"]}
              />
            </Box>
            {items?.length ? (
              <>
                <ProductList
                  lines={items}
                  remove={removeItem}
                />
                <Box className={classes["cart__footer"]}>
                  <Box className={classes["cart__footer__price"]}>
                    <Box component="span">
                      <FormattedMessage {...commonMessages.subtotal} />
                    </Box>
                    <Box component="span">
                      <Money
                        data-test="subtotalPrice"
                        money={subtotalPrice?.net}
                      />
                    </Box>
                  </Box>

                  {shippingTaxedPrice && shippingTaxedPrice.net.amount !== 0 && (
                    <Box className={classes["cart__footer__price"]}>
                      <Box component="span">
                        <FormattedMessage {...commonMessages.shipping} />
                      </Box>
                      <Box component="span">
                        <Money
                          data-test="shippingPrice"
                          money={shippingTaxedPrice.net}
                        />
                      </Box>
                    </Box>
                  )}

                  {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                    <Box className={classes["cart__footer__price"]}>
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

                  <Box className={classes["cart__footer__price"]}>
                    <Box component="span">
                      <FormattedMessage
                        defaultMessage="Taxes"
                        description="taxes"
                      />
                    </Box>
                    <Box component="span">
                      <Money money={calculateTax(totalPrice)} />
                    </Box>
                  </Box>

                  <Box className={classes["cart__footer__price"]}>
                    <Box component="span">
                      <FormattedMessage {...commonMessages.total} />
                    </Box>
                    <Box component="span">
                      <Money
                        data-test="totalPrice"
                        money={totalPrice?.gross}
                      />
                    </Box>
                  </Box>

                  <Box className={classes["cart__footer__button"]}>
                    <Link href="/cart">
                      <a>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={hide}
                        >
                          <FormattedMessage defaultMessage="Go to my cart" />
                        </Button>
                      </a>
                    </Link>
                  </Box>
                  <Box className={classes["cart__footer__button"]}>
                    <Link href={user ? "/checkout" : "/login"}>
                      <a>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={hide}
                        >
                          <FormattedMessage {...commonMessages.checkout} />
                        </Button>
                      </a>
                    </Link>
                  </Box>
                </Box>
              </>
            ) : (
              <Empty overlayHide={hide} />
            )}
          </>
        ) : (
          <OfflinePlaceholder />
        )}
      </Box>
    </Overlay>
  );
};

export default Cart;
