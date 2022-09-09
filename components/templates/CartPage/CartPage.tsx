import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";

import { calculateTax } from "components/molecules/TaxedMoney/calculateTax";
import { Money } from "components/atoms/Money";
import { Loader } from "components/atoms/Loader";
import { TaxedMoney } from "components/molecules/TaxedMoney";
import { useAuth, useCart, useCheckout } from "nautical-api";
import { checkoutMessages, commonMessages } from "core/intl";

import { CartRow } from "./CartRow";
import * as S from "./styles";

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
      <S.Container>
        <S.Wrapper>
          <S.Title>
            <h1 data-test="cartPageTitle">
              <FormattedMessage defaultMessage="My Cart" />
            </h1>
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
                key={item.id || index}
                item={item}
              />
            ))}
          </S.Cart>
          <S.CartFooter>
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
        </S.Wrapper>
      </S.Container>
    );
  }
  return (
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
  );
};
