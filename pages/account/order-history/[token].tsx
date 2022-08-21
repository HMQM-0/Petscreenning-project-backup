import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import {
  OrderHistoryDetailsPageDocument,
  OrderHistoryDetailsPageQuery,
} from "components/templates/OrderHistoryDetailsPage/queries.graphql.generated";

import { OrderHistoryDetailsPage } from "components/templates/OrderHistoryDetailsPage";
import NotFound from "components/molecules/NotFound";
import { AccountSettingsLayout } from "@layouts/AccountSettingsLayout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { getSsrApolloClient } from "apollo-client";
import { IS_SSR } from "utils";

const OrderHistory: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ token, data }) => {
  const URL = IS_SSR ? "" : location.href;
  const description = "Order History Details";
  const title = "Order";
  const schema = structuredData(description, title, URL);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
  };

  if (!token) {
    return <NotFound />;
  }

  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <OrderHistoryDetailsPage token={token} />
      </AccountSettingsLayout>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext<{ token: string }>) => {
  const client = getSsrApolloClient(context);

  const token = context.params?.token ?? "";

  const { data } = await client.query<OrderHistoryDetailsPageQuery>({
    query: OrderHistoryDetailsPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      token,
      data,
      __APOLLO__,
    },
  };
};

export default OrderHistory;
