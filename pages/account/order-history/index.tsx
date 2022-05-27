import type { NextPage, InferGetStaticPropsType } from "next";
import * as React from "react";

import { OrderHistoryPageDocument, OrderHistoryPageQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { OrderHistoryPage } from "components/templates/OrderHistoryPage";
import { getApolloClient } from "apollo-client";

import { AccountSettingsLayout } from "../../../components/layouts/AccountSettingsLayout";

const OrderHistory: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ data }) => {
  const description = "Order History";
  const title = "Order History";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  return (
    // @ts-ignore TODO: BE issue BrandingFragment cannot be null | undefined
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <OrderHistoryPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export async function getStaticProps() {
  const client = getApolloClient();

  // TODO: Determine if we can get the JWT for SSR queries
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
