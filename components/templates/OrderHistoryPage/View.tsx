import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { styled } from "@styles";

import { useNauticalOrdersByUserQuery } from "./queries.graphql.generated";

import { OrderTable } from "../../molecules/OrderTable";

const ORDERS_PER_APICALL = 5;

export const LoadMoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.spacer};
`;

export const View = () => {
  const { data, loading, fetchMore } = useNauticalOrdersByUserQuery({
    variables: {
      perPage: ORDERS_PER_APICALL,
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  const orders = data?.me?.nauticalOrders?.edges.map(({ node }) => node) ?? [];

  return (
    <>
      <OrderTable orders={orders} />

      {data?.me?.nauticalOrders?.pageInfo.hasNextPage && (
        <LoadMoreWrapper>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  after: data?.me?.nauticalOrders?.pageInfo.endCursor,
                  perPage: ORDERS_PER_APICALL,
                },
              });
            }}
          >
            <FormattedMessage defaultMessage="Load more" />
          </Button>
        </LoadMoreWrapper>
      )}
    </>
  );
};

export default View;
