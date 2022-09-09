import React from "react";
import { FormattedMessage, FormattedDate, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import { Box } from "@mui/material";
import Link from "next/link";

import { commonMessages, translateOrderStatus } from "core/intl";
import { generateProductUrl } from "core/utils";
import { Thumbnail } from "components/molecules/Thumbnail";
import { TaxedMoney } from "components/molecules/TaxedMoney";

import * as S from "./styles";
import { IProps } from "./types";

type HeaderProps = { matches: boolean };

const Header = ({ matches }: HeaderProps) => (
  <S.HeaderRow>
    <S.IndexNumber>
      <FormattedMessage defaultMessage="Order Number" />
    </S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>
          <FormattedMessage defaultMessage="Products Ordered" />
        </S.ProductsOrdered>
        <S.DateOfOrder>
          <FormattedMessage defaultMessage="Order Placed" />
        </S.DateOfOrder>
        <S.Value>
          <FormattedMessage defaultMessage="Total" />
        </S.Value>
      </>
    )}
    <S.Status>
      <FormattedMessage {...commonMessages.status} />
    </S.Status>
  </S.HeaderRow>
);

export const OrderTable = ({ orders }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches) => {
          return (
            <>
              <S.Row>
                <Header matches={matches} />
              </S.Row>
              {orders?.map((order) => {
                const date = new Date(order.created);
                return (
                  <Link
                    key={order.number}
                    href={`/account/order-history/${order.token}/`}
                    passHref
                  >
                    <S.Row
                      data-test="orderEntry"
                      data-test-id={order.number}
                    >
                      <S.IndexNumber>{order.number}</S.IndexNumber>
                      {matches && (
                        <>
                          <S.ProductsOrdered>
                            {order.lines.slice(0, 5).map((product: any) => (
                              <Link
                                key={product?.variant?.product?.id}
                                href={generateProductUrl(product.variant.product.id, product.variant.product.name)}
                                passHref
                              >
                                <Box component="a">
                                  <Thumbnail source={product} />
                                </Box>
                              </Link>
                            ))}
                          </S.ProductsOrdered>
                          <S.DateOfOrder>
                            <FormattedDate value={date} />
                          </S.DateOfOrder>
                          <S.Value>
                            <TaxedMoney taxedMoney={order.total} />
                          </S.Value>
                        </>
                      )}
                      <S.Status>{order.statusDisplay && translateOrderStatus(order.statusDisplay, intl)}</S.Status>
                    </S.Row>
                  </Link>
                );
              })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
