import * as React from "react";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { useAuth } from "nautical-api";

import { OrderHistoryItem } from "./OrderHistoryItem";
import { useNauticalOrderByTokenQuery } from "./queries.graphql.generated";
import styles from './scss/index.module.scss';

import NotFound from "../../molecules/NotFound";

type ViewProps = {
  token: string;
};

export const View = ({ token }: ViewProps) => {
  const { user } = useAuth();

  const { data, loading } = useNauticalOrderByTokenQuery({
    variables: { token: token },
  });

  if (loading) {
    return <CircularProgress />;
  }

  const order = data?.nauticalOrderByToken;
  const invoices = data?.nauticalOrderByToken?.invoices;

  if (!order) {
    return <NotFound />;
  }

  return (
    <>
      {!!user && (
        <Link
          href="/account/order-history/"
          passHref
        >
          <a className={styles.link}>
            <FormattedMessage defaultMessage="Go back to Order History" />
          </a>
        </Link>
      )}

      <OrderHistoryItem order={order} invoices={invoices} />
    </>
  );
};

export default View;
