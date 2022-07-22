import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Modal } from "@mui/material";

import { useCart, useCheckout } from "nautical-api";
import { ITaxedMoney } from "components/molecules/TaxedMoney/types";
import { Loader } from "components/atoms/Loader";

import Checkout from "./Checkout";

const convertToTaxedMoney = (value?: ITaxedMoney) => {
  const converted = value;
  return converted;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    height: "100vh",
    width: "100vw",
    // @ts-ignore
    // [theme.breakpoints.down("sm")]: {
    //   height: "auto",
    // },
  },
  modal: {
    overflow: "auto",
    display: "block",
    width: "100vw",
    height: "100vh",
    // @ts-ignore
    "& .MuiBackdrop-root": {
      backgroundColor: "white",
    },
  },
}));

interface ICheckoutProps {
  logo: React.ReactNode;
}

const CheckoutPage = ({ logo }: ICheckoutProps) => {
  const classes = useStyles();
  const [modal, setModal] = React.useState(true);

  const { loaded: cartLoaded, shippingPrice, discount, subtotalPrice, totalPrice, items } = useCart();
  const { loaded: checkoutLoaded, applicableVolumeDiscounts, sellerShippingMethods } = useCheckout();

  const shippingTaxedPrice =
    sellerShippingMethods && sellerShippingMethods.length > 5 && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  return (
    <>
      <Modal open={modal} className={classes.modal}>
        <Box className={classes.backdrop}>
          {!checkoutLoaded || !cartLoaded ? (
            <Loader />
          ) : (
            <Checkout
              items={items}
              logo={logo}
              subtotal={convertToTaxedMoney(subtotalPrice ?? undefined)}
              promoCode={convertToTaxedMoney(promoTaxedPrice ?? undefined)}
              shipping={convertToTaxedMoney(shippingTaxedPrice ?? undefined)}
              volumeDiscount={applicableVolumeDiscounts ?? undefined}
              total={convertToTaxedMoney(totalPrice ?? undefined)}
              close={() => setModal(false)}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export { CheckoutPage };
