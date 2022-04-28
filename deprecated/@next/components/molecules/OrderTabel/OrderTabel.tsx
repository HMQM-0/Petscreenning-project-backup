import React from "react";
import { FormattedMessage, FormattedDate, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import { Box } from "@mui/material";
import { TaxedMoney } from "@components/containers";
import { commonMessages, translateOrderStatus } from "deprecated/intl";

import { Thumbnail } from "..";
import {
  generateMicrositeProductUrl,
  generateMicrositeUrl,
  generateProductUrl,
  getMicrositeId,
  getMicrositeSlug,
  isMicrosite,
} from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";
import { useNavigate } from "react-router";

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

export const OrderTabel: React.FC<IProps> = ({ orders }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();
  const navigate = useNavigate();
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
                  const date = new Date(order.node.created);
                  return (
                    <S.Row
                      data-test="orderEntry"
                      data-test-id={order.node.number}
                      key={order.node.number}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        navigate(
                          !!isMicrosite()
                            ? `${generateMicrositeUrl(
                                getMicrositeId(),
                                getMicrositeSlug()
                              )}order-history/${order.node.token}`
                            : `/order-history/${order.node.token}`
                        );
                      }}
                    >
                      <S.IndexNumber>{order.node.number}</S.IndexNumber>
                      {matches ? (
                        <>
                          <S.ProductsOrdered>
                            {order.node.lines
                              .slice(0, 5)
                              .map((product: any) => (
                                <Box
                                  component="span"
                                  key={product?.variant?.product?.id}
                                  // @ts-ignore
                                  onClick={(evt) => {
                                    evt.stopPropagation();
                                    navigate(
                                      !!isMicrosite()
                                        ? generateMicrositeProductUrl(
                                            product.variant.product.id,
                                            product.variant.product.name,
                                            getMicrositeId(),
                                            getMicrositeSlug()
                                          )
                                        : generateProductUrl(
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
                            <TaxedMoney taxedMoney={order.node.total} />
                          </S.Value>
                        </>
                      ) : (
                        ""
                      )}
                      <S.Status>
                        {translateOrderStatus(order.node.statusDisplay, intl)}
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
