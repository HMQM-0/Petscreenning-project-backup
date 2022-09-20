import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getSsrApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import {
  OrderHistoryDetailsPageDocument,
  OrderHistoryDetailsPageQuery,
} from "src/components/templates/OrderHistoryDetailsPage/queries.graphql.generated";
import { OrderHistoryDetailsPage } from "src/components/templates/OrderHistoryDetailsPage";
import NotFound from "src/components/molecules/NotFound";
import { AccountSettingsLayout } from "@layouts/AccountSettingsLayout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";

const OrderHistory: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ token, documentHead }) => {
  if (!token) {
    return <NotFound />;
  }

  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout allowAnonymousUser>
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

  const url = getSeoURL(context);
  const description = "Order History Details";
  const title = "Order";
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
      token,
      documentHead,
      __APOLLO__,
    },
  };
};

export default OrderHistory;
