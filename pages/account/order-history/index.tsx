import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { NextPage } from "next";
import * as React from "react";

import { getSsrApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { OrderHistoryPage } from "src/components/templates/OrderHistoryPage";
import {
  OrderHistoryPageDocument,
  OrderHistoryPageQuery,
} from "src/components/templates/OrderHistoryPage/queries.graphql.generated";
import { AccountSettingsLayout } from "@layouts/AccountSettingsLayout";

const OrderHistory: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ documentHead }) => {
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

  const url = getSeoURL(context);
  const description = "Order History";
  const title = "Order History";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
  };

  return {
    props: {
      documentHead,
    },
  };
}

export default OrderHistory;
