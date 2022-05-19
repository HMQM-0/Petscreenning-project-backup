import React from "react";
import { FormattedMessage, FormattedDate, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

import { TaxedMoney } from "components/containers/TaxedMoney";
import { commonMessages, translateOrderStatus } from "deprecated/intl";
import { generateProductUrl } from "core/utils";
import { Thumbnail } from "components/molecules/Thumbnail";

import * as S from "./styles";
import { IProps } from "./types";

const header = (matches: boolean) => (
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

export const OrderTable: React.FC<IProps> = ({ orders }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();
  const router = useRouter();

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              <S.Row>{header(matches)}</S.Row>
              {orders &&
                orders.map((order) => {
                  const date = new Date(order.created);
                  return (
                    <S.Row
                      data-test="orderEntry"
                      data-test-id={order.number}
                      key={order.number}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        router.push(`/account/order-history/${order.token}/`);
                      }}
                    >
                      <S.IndexNumber>{order.number}</S.IndexNumber>
                      {matches ? (
                        <>
                          <S.ProductsOrdered>
                            {order.lines.slice(0, 5).map((product: any) => (
                              <Box
                                component="span"
                                key={product?.variant?.product?.id}
                                // @ts-ignore
                                onClick={(evt) => {
                                  evt.stopPropagation();
                                  router.push(
                                    generateProductUrl(
                                      product.variant.product.id,
                                      product.variant.product.name
                                    )
                                  );
                                }}
                              >
                                <Thumbnail source={product} />
                              </Box>
                            ))}
                          </S.ProductsOrdered>
                          <S.DateOfOrder>
                            <FormattedDate value={date} />
                          </S.DateOfOrder>
                          <S.Value>
                            <TaxedMoney taxedMoney={order.total} />
                          </S.Value>
                        </>
                      ) : (
                        ""
                      )}
                      <S.Status>
                        {
                          order.statusDisplay &&
                          translateOrderStatus(order.statusDisplay, intl)
                        }
                      </S.Status>
                    </S.Row>
                  );
                })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
