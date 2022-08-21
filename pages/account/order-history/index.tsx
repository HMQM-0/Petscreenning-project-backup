import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { NextPage } from "next";
import * as React from "react";

import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { OrderHistoryPage } from "components/templates/OrderHistoryPage";
import { getSsrApolloClient } from "apollo-client";
import {
  OrderHistoryPageDocument,
  OrderHistoryPageQuery,
} from "components/templates/OrderHistoryPage/queries.graphql.generated";
import { AccountSettingsLayout } from "@layouts/AccountSettingsLayout";
import { IS_SSR } from "utils";

const OrderHistory: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const URL = IS_SSR ? "" : location.href;
  const description = "Order History";
  const title = "Order History";
  const schema = structuredData(description, title, URL);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
  };

  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <OrderHistoryPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getSsrApolloClient(context);

  const { data } = await client.query<OrderHistoryPageQuery>({
    query: OrderHistoryPageDocument,
  });

  return {
    props: {
      data,
    },
  };
}

export default OrderHistory;
