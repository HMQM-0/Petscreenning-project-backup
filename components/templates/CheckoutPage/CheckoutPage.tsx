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

interface ICheckoutProps {
  logo: React.ReactNode;
  setHasTriedFinalizingPayment: React.Dispatch<boolean>;
}

const CheckoutPage = ({ logo, setHasTriedFinalizingPayment }: ICheckoutProps) => {
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
      <Modal
        open={modal}
        sx={{
          overflow: "auto",
          display: "block",
          width: "100vw",
          height: "100vh",

          "& .MuiBackdrop-root": {
            backgroundColor: "white",
          },
        }}
      >
        <Box
          sx={{
            height: {
              xs: "auto",
              sm: "100vh",
            },
            display: "flex",
            flexDirection: "column",
            width: "100vw",
          }}
        >
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
              setHasTriedFinalizingPayment={setHasTriedFinalizingPayment}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export { CheckoutPage };
