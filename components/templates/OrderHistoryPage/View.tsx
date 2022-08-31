import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { styled } from "@styles";

import {
  NauticalOrderByUserFragment,
  NauticalOrdersByUserQuery,
  useNauticalOrdersByUserQuery,
} from "./queries.graphql.generated";

import { OrderTable } from "../../molecules/OrderTable";

const ORDERS_PER_APICALL = 5;

export const LoadMoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.spacer};
`;

export const View = () => {
  const [orders, setOrders] = React.useState<NauticalOrderByUserFragment[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [after, setAfter] = React.useState<string | null>("");
  const { data, loading, fetchMore } = useNauticalOrdersByUserQuery({
    variables: {
      perPage: ORDERS_PER_APICALL,
    },
  });

  const resolveData = (data: NauticalOrdersByUserQuery | undefined) => {
    const nextOrders = data?.me?.nauticalOrders?.edges.map(({ node }) => node) ?? [];
    const hasNext = data?.me?.nauticalOrders?.pageInfo.hasNextPage ?? false;
    const nextAfter = data?.me?.nauticalOrders?.pageInfo.endCursor ?? null;
    setOrders((current) => [...current, ...nextOrders]);
    setHasNextPage(hasNext);
    setAfter(nextAfter);
  };

  React.useEffect(() => {
    resolveData(data);
  }, [data]);

  const handleFetchMore = async () => {
    const { data } = await fetchMore({
      variables: {
        after,
        perPage: ORDERS_PER_APICALL,
      },
    });
    resolveData(data);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <OrderTable orders={orders} />

      {hasNextPage && (
        <LoadMoreWrapper>
          <Button onClick={handleFetchMore}>
            <FormattedMessage defaultMessage="Load more" />
          </Button>
        </LoadMoreWrapper>
      )}
    </>
  );
};

export default View;
