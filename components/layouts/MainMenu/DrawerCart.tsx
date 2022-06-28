import { Button, Drawer, Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

import { useCheckout } from "@nautical/react";
import { useAuth, useCart } from "nautical-api";
import { commonMessages } from "core/intl";
import { TaxedMoney } from "components/molecules/TaxedMoney";
import { cartUrl, checkoutLoginUrl, checkoutUrl } from "deprecated/app/routes/paths";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import ProductList from "components/organisms/OverlayManager/Cart/ProductList";
import overlayClasses from "components/organisms/OverlayManager/Cart/scss/index.module.scss";
import Empty from "components/organisms/OverlayManager/Cart/Empty";
import { useNetworkStatus } from "@hooks";
import { Loader } from "deprecated/components";

import classes from "./scss/index.module.scss";

interface IDrawerCartProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;

  close(): void;
}

const DrawerCart: React.FunctionComponent<IDrawerCartProps> = (props) => {
  const { anchor, open, close } = props;
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const { items, removeItem, subtotalPrice, shippingPrice, discount, totalPrice } = useCart();
  const { online: isOnline } = useNetworkStatus();

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

  const itemsQuantity = items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0;

  return (
    <Drawer anchor={anchor} open={open} ModalProps={{ onBackdropClick: close }}>
      {isOnline ? (
        <Box className={overlayClasses.cart}>
          <Box className={overlayClasses.overlay__header}>
            <LocalMallIcon className={overlayClasses["overlay__header__cart-icon"]} color="secondary" />
            <Box className={overlayClasses["overlay__header-text"]}>
              <FormattedMessage defaultMessage="My cart," />{" "}
              <Box component="span" className={overlayClasses["overlay__header-text-items"]}>
                <FormattedMessage
                  defaultMessage="{itemsQuantity,plural,one{{itemsQuantity} item} other{{itemsQuantity} items}}"
                  description="items quantity in cart"
                  values={{
                    itemsQuantity,
                  }}
                />
              </Box>
            </Box>
            <CloseIcon onClick={close} className={overlayClasses["overlay__header__close-icon"]} />
          </Box>
          {items?.length ? (
            <>
              {missingVariants() ? (
                <Loader full />
              ) : (
                <>
                  <ProductList lines={items} remove={removeItem} />
                  <Box className={overlayClasses["cart__footer"]}>
                    <Box className={overlayClasses["cart__footer__price"]}>
                      <Box component="span">
                        <FormattedMessage {...commonMessages.subtotal} />
                      </Box>
                      <Box component="span">
                        <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
                      </Box>
                    </Box>

                    {shippingTaxedPrice && shippingTaxedPrice.gross.amount !== 0 && (
                      <Box className={overlayClasses["cart__footer__price"]}>
                        <Box component="span">
                          <FormattedMessage {...commonMessages.shipping} />
                        </Box>
                        <Box component="span">
                          <TaxedMoney data-test="shippingPrice" taxedMoney={shippingTaxedPrice} />
                        </Box>
                      </Box>
                    )}

                    {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                      <Box className={overlayClasses["cart__footer__price"]}>
                        <Box component="span">
                          <FormattedMessage {...commonMessages.promoCode} />
                        </Box>
                        <Box component="span">
                          <TaxedMoney data-test="promoCodePrice" taxedMoney={promoTaxedPrice} />
                        </Box>
                      </Box>
                    )}

                    <Box className={overlayClasses["cart__footer__price"]}>
                      <Box component="span">
                        <FormattedMessage {...commonMessages.total} />
                      </Box>
                      <Box component="span">
                        <TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />
                      </Box>
                    </Box>

                    <Box className={overlayClasses["cart__footer__button"]}>
                      <Link href={cartUrl}>
                        <a>
                          <Button
                            className={classes["drawer-button"]}
                            variant="outlined"
                            color="secondary"
                            onClick={close}
                          >
                            <FormattedMessage defaultMessage="Go to my cart" />
                          </Button>
                        </a>
                      </Link>
                    </Box>
                    <Box className={overlayClasses["cart__footer__button"]}>
                      <Link href={user ? checkoutUrl : checkoutLoginUrl}>
                        <a>
                          <Button
                            className={classes["drawer-button"]}
                            variant="contained"
                            color="secondary"
                            onClick={close}
                          >
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
            <Empty overlayHide={close} />
          )}
        </Box>
      ) : (
        <Box className={overlayClasses.cart}>
          <OfflinePlaceholder />
        </Box>
      )}
    </Drawer>
  );
};

export default DrawerCart;
