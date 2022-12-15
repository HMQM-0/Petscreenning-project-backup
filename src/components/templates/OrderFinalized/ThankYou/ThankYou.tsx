import React from "react";
import { FormattedMessage } from "react-intl";
import { Box, Button } from "@mui/material";
import Link from "next/link";

import { checkoutMessages } from "src/core/intl";
import { useAuth } from "nautical-api";

import * as S from "./styles";
import { IProps } from "./types";

const ThankYou = ({ orderEmail, orderNumber, token }: IProps) => {
  const { user } = useAuth();
  return (
    <Box className="container">
      <S.Wrapper>
        <S.ThankYouHeader>
          <FormattedMessage defaultMessage="Thank you" />
          <br />
          <span>
            <FormattedMessage defaultMessage="for your order!" />
          </span>
        </S.ThankYouHeader>
        <S.Paragraph>
          <FormattedMessage defaultMessage="Your order number is" /> <span>{orderNumber}</span>
          <FormattedMessage defaultMessage="." />
        </S.Paragraph>
        {orderEmail ? (
          <S.Paragraph>
            <FormattedMessage defaultMessage="We’ve emailed your order confirmation to" /> <span>{orderEmail}</span>
            <FormattedMessage defaultMessage=". We’ll notify you when your order has shipped." />
          </S.Paragraph>
        ) : (
          <S.Paragraph>
            <FormattedMessage defaultMessage="We have emailed your order confirmation, and we will notify you when the order has shipped." />
          </S.Paragraph>
        )}
        <S.Buttons>
          <Link href="/">
            <a>
              <Button
                // testingContext="continueShoppingButton"
                variant="contained"
                color="secondary"
                fullWidth
              >
                <FormattedMessage {...checkoutMessages.continueShopping} />
              </Button>
            </a>
          </Link>
          <Link href={user ? `/account/order-history/${token}` : "/login"}>
            <a>
              <Button
                // testingContext="gotoOrderDetailsButton"

                variant="contained"
                fullWidth
              >
                <FormattedMessage defaultMessage="ORDER DETAILS" />
              </Button>
            </a>
          </Link>
        </S.Buttons>
      </S.Wrapper>
    </Box>
  );
};

export { ThankYou };
