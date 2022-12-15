import Media from "react-media";
import React, { Fragment } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useAlert } from "react-alert";

import { useCheckout } from "nautical-api";
import { ITaxedMoney } from "src/components/molecules/TaxedMoney/types";
import { TaxedMoney } from "src/components/molecules/TaxedMoney";
import { ICheckoutModelPriceValue } from "src/components/providers/Nautical/Checkout/types";

import CartSummaryFooter from "./CartSummaryFooter";
import CartSummaryRow from "./CartSummaryRow";
import {
  accordion,
  accordionSummary,
  discountChip,
  priceButton,
  promoCodeContainer,
  root,
  title,
  titleSummary,
  orderSummary,
  cartProducts,
} from "./styles";

import { IProduct } from "../types";

interface ICartSummaryProps {
  subtotal?: ITaxedMoney;
  promoCode?: ITaxedMoney;
  shipping?: ITaxedMoney;
  total?: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue;
  products?: IProduct[] | null;
  loyaltyPoints?: React.ReactNode;
  onPaymentStep?: boolean;
}

const CartSummary = ({
  products,
  subtotal,
  promoCode,
  shipping,
  total,
  volumeDiscount,
  onPaymentStep,
  loyaltyPoints,
}: ICartSummaryProps) => {
  const [code, setCode] = React.useState<string>("");
  const alert = useAlert();
  const { promoCodeDiscount, addPromoCode, removePromoCode } = useCheckout();

  const handleAddPromoCode = async () => {
    console.info("HANDLING ADD PROMO CODE");
    const promoResult = await addPromoCode(code);
    console.info(promoResult);
    if (promoResult?.dataError?.error) {
      var CouponCodemsg = document.querySelector("[data-alert-code-msg]");
      if (CouponCodemsg) {
        if (CouponCodemsg?.classList.contains("error-promo-code")) {
          // CouponCodemsg?.removeChild(alertCode);
          // CouponCodemsg.classList.remove("error-promo-code");
        } else {
          CouponCodemsg.classList.add("error-promo-code");
          var alertCode = document.createElement("span");
          alertCode.classList.add("alert-promo-code");
          alertCode.innerHTML = "Promo code is not valid";
          CouponCodemsg?.appendChild(alertCode);
        }
      }

      alert.show(
        {
          title: "Could not add promo code",
        },
        { type: "error" },
      );
    } else {
      var AlertPromoCode = document.querySelector(".error-promo-code .alert-promo-code");
      if (AlertPromoCode) {
        AlertPromoCode.remove();
      }
      var CouponCodemsg = document.querySelector("[data-alert-code-msg]");
      if (CouponCodemsg) {
        CouponCodemsg.classList.remove("error-promo-code");
      }
      alert.show(
        {
          title: "Added promo code",
        },
        { type: "success" },
      );
    }
  };

  const handleRemovePromoCode = async () => {
    console.info("HANDLING REMOVE PROMO CODE");
    const promoResult = await removePromoCode(promoCodeDiscount?.voucherCode ?? "");
    console.info(promoResult);
    if (promoResult?.dataError?.error) {
      alert.show(
        {
          title: "Could not remove promo code",
        },
        { type: "error" },
      );
    } else {
      alert.show(
        {
          title: "Removed promo code",
        },
        { type: "success" },
      );
    }
  };

  return (
    <Box sx={root}>
      <Media queries={{ small: { maxWidth: 599 } }}>
        {(matches) => (
          <Fragment>
            {matches.small ? (
              <>
                <Accordion
                  elevation={0}
                  disableGutters
                  sx={accordion}
                >
                  <AccordionSummary sx={accordionSummary}>
                    <Typography
                      sx={titleSummary}
                      variant="h6"
                    >
                      Order Summary
                    </Typography>
                    <Button
                      sx={priceButton}
                      color="inherit"
                      variant="outlined"
                      startIcon={<ShoppingCartIcon style={{ height: 16, width: 16 }} />}
                    >
                      <TaxedMoney taxedMoney={total} />
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <Divider />
                    <Box>
                      <Box sx={orderSummary}>
                        {onPaymentStep &&
                          (loyaltyPoints ? (
                            <Box style={{ marginTop: "30px " }}>{loyaltyPoints}</Box>
                          ) : (
                            <Box>
                              <Box
                                data-alert-code-msg
                                sx={promoCodeContainer}
                              >
                                <TextField
                                  onChange={(event) => setCode(event.target.value)}
                                  placeholder="Apply Promo code"
                                  value={code}
                                />
                                <Button onClick={handleAddPromoCode}>APPLY</Button>
                              </Box>
                              {promoCodeDiscount?.voucherCode && (
                                <Chip
                                  sx={discountChip}
                                  label={promoCodeDiscount.discountName}
                                  // onClick={handleClick}
                                  onDelete={handleRemovePromoCode}
                                />
                              )}
                              <Divider />
                            </Box>
                          ))}
                        <CartSummaryFooter
                          subtotal={subtotal}
                          total={total}
                          shipping={shipping}
                          promoCode={promoCode}
                          volumeDiscount={volumeDiscount}
                        />
                      </Box>
                      <Box sx={cartProducts}>
                        <Typography
                          sx={titleSummary}
                          variant="h6"
                        >
                          Shopping Cart
                        </Typography>
                        {products?.map((product, index) => (
                          <Box key={product.sku}>
                            <Box>
                              <CartSummaryRow
                                index={index}
                                sku={product.sku}
                                quantity={product.quantity}
                                variant={product.variant}
                                name={product.name}
                                price={product.price}
                                priceUndiscounted={product.priceUndiscounted}
                                thumbnail={product.thumbnail}
                              />
                            </Box>
                            <Divider />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <>
                <Box>
                  <Box sx={orderSummary}>
                    <Typography
                      sx={titleSummary}
                      variant="h6"
                    >
                      Order Summary
                    </Typography>
                    {onPaymentStep &&
                      (loyaltyPoints ? (
                        <Box style={{ marginTop: "30px" }}>{loyaltyPoints}</Box>
                      ) : (
                        <Box>
                          <Box
                            data-alert-code-msg
                            sx={promoCodeContainer}
                          >
                            <TextField
                              onChange={(event) => setCode(event.target.value)}
                              placeholder="Apply Promo code"
                              value={code}
                            />
                            {/* <Button onClick={() => addPromoCode(code)}>APPLY</Button> */}
                            <Button onClick={handleAddPromoCode}>APPLY</Button>
                          </Box>
                          {promoCodeDiscount?.voucherCode && (
                            <Chip
                              sx={discountChip}
                              label={promoCodeDiscount.discountName}
                              // onClick={handleClick}
                              onDelete={() => removePromoCode(promoCodeDiscount?.voucherCode ?? "")}
                            />
                          )}
                          <Divider />
                        </Box>
                      ))}
                    <CartSummaryFooter
                      subtotal={subtotal}
                      total={total}
                      shipping={shipping}
                      promoCode={promoCode}
                      volumeDiscount={volumeDiscount}
                    />
                  </Box>
                  <Box sx={cartProducts}>
                    <Typography
                      sx={titleSummary}
                      variant="h6"
                    >
                      Shopping Cart
                    </Typography>
                    {products?.map((product, index) => (
                      <Box key={product.sku}>
                        <Box>
                          <CartSummaryRow
                            index={index}
                            sku={product.sku}
                            quantity={product.quantity}
                            variant={product.variant}
                            name={product.name}
                            price={product.price}
                            priceUndiscounted={product.priceUndiscounted}
                            thumbnail={product.thumbnail}
                          />
                        </Box>
                        <Divider />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </Fragment>
        )}
      </Media>
    </Box>
  );
};

export default CartSummary;
