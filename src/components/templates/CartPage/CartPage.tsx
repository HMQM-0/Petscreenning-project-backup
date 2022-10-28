import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography, Button } from "@mui/material";

import { calculateTax } from "src/components/molecules/TaxedMoney/calculateTax";
import { Money } from "src/components/atoms/Money";
import { Loader } from "src/components/atoms/Loader";
import { TaxedMoney } from "src/components/molecules/TaxedMoney";
import { useAuth, useCart, useCheckout } from "nautical-api";
import { checkoutMessages, commonMessages } from "src/core/intl";

import { CartRow } from "./CartRow";
import * as S from "./styles";
import {
  title,
} from "./styles";

export const CartPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { sellerShippingMethods, loaded: checkoutLoaded } = useCheckout();
  const { loaded: cartLoaded, items, totalPrice, subtotalPrice, shippingPrice, discount } = useCart();

  if (!checkoutLoaded || !cartLoaded) {
    return <Loader />;
  }

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

  const showShipping = !!shippingTaxedPrice && shippingPrice?.amount !== 0;
  const showDiscount = discount?.amount !== 0;

  if (items?.length) {
    return (
      <S.mainWrapper>
        <S.Container>
          <S.Wrapper>
            <S.Left>
              <S.Title>
                <Typography
                  sx={title}
                  data-test="cartPageTitle"
                  variant="h1"
                >
                  <FormattedMessage defaultMessage="My Cart" />
                </Typography>
              </S.Title>
              <S.CartHeader>
                <S.HeaderWrapper>
                  <S.Column>
                    <FormattedMessage {...commonMessages.products} />
                  </S.Column>
                  <S.Column>
                    <FormattedMessage {...commonMessages.price} />
                  </S.Column>
                  <S.Column>
                    <FormattedMessage {...commonMessages.quantity} />
                  </S.Column>
                  <S.Column>
                    <FormattedMessage
                      defaultMessage="Taxes"
                      description="taxes"
                    />
                  </S.Column>
                  <S.Column>
                    <FormattedMessage {...commonMessages.totalPrice} />
                  </S.Column>
                </S.HeaderWrapper>
              </S.CartHeader>
              <S.Cart>
                {items.map((item, index) => (
                  <CartRow
                    key={item.variant.id}
                    item={item}
                  />
                ))}
              </S.Cart>
            </S.Left>
            <S.Right>
              <S.CartFooter>
                <S.Title>
                  <Typography
                    sx={title}
                    variant="h2"
                  >
                    <FormattedMessage defaultMessage="Order recap" />
                  </Typography>
                </S.Title>
                <S.Cart>
                  <S.FooterWrapper
                    showShipping={showShipping}
                    showDiscount={showDiscount}
                  >
                    <S.SubtotalText>
                      <FormattedMessage {...commonMessages.subtotal} />
                    </S.SubtotalText>
                    <S.SubtotalPrice>
                      <Money
                        data-test="subtotalPrice"
                        money={subtotalPrice?.net}
                      />
                    </S.SubtotalPrice>
                    {showShipping && (
                      <>
                        <S.ShippingText>
                          <FormattedMessage {...commonMessages.shipping} />
                        </S.ShippingText>
                        <S.ShippingPrice>
                          <Money
                            data-test="shippingPrice"
                            money={shippingTaxedPrice?.net}
                          />
                        </S.ShippingPrice>
                      </>
                    )}
                    {showDiscount && (
                      <>
                        <S.DiscountText>
                          <FormattedMessage {...commonMessages.promoCode} />
                        </S.DiscountText>
                        <S.DiscountPrice>
                          <TaxedMoney
                            data-test="discountPrice"
                            taxedMoney={promoTaxedPrice}
                          />
                        </S.DiscountPrice>
                      </>
                    )}
                    <S.TaxText>
                      <FormattedMessage
                        defaultMessage="Taxes"
                        description="taxes"
                      />
                    </S.TaxText>
                    <S.TaxPrice>
                      <Money money={calculateTax(totalPrice)} />
                    </S.TaxPrice>
                    <S.TotalText>
                      <FormattedMessage {...commonMessages.total} />
                    </S.TotalText>
                    <S.TotalPrice>
                      <Money
                        data-test="totalPrice"
                        money={totalPrice?.gross}
                      />
                    </S.TotalPrice>
                  </S.FooterWrapper>
                </S.Cart>
              </S.CartFooter>
              <S.ProceedButton>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push(user ? `/checkout/` : `/login/`)}
                >
                  <FormattedMessage defaultMessage="PROCEED TO CHECKOUT" />
                </Button>
              </S.ProceedButton>
            </S.Right>
          </S.Wrapper>
        </S.Container>
      </S.mainWrapper>
    );
  }
  return (
    <S.mainWrapper>
      <S.Container>
        <S.EmptyWrapper>
          <S.TitleFirstLine>
            <FormattedMessage defaultMessage="Your Cart" />
          </S.TitleFirstLine>
          <S.TitleSecondLine>
            <FormattedMessage defaultMessage="looks empty" />
          </S.TitleSecondLine>
          <S.HR />
          <S.Subtitle>
            <FormattedMessage defaultMessage="Maybe you haven’t made your choices yet" />
          </S.Subtitle>
          <S.ContinueButton>
            <Button onClick={() => router.push("/")}>
              <FormattedMessage {...checkoutMessages.continueShopping} />
            </Button>
          </S.ContinueButton>
        </S.EmptyWrapper>
      </S.Container>
    </S.mainWrapper>
  );
};
