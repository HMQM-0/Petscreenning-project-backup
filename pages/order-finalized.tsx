import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { OrderFinalized } from "components/templates/OrderFinalized";
import {
  OrderFinalizedPageDocument,
  OrderFinalizedPageQuery,
  OrderFinalizedPageQueryVariables,
} from "components/templates/OrderFinalized/queries.graphql.generated";
import { getSeoURL } from "utils";
import { DocumentHead } from "types";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data, documentHead }) => {
  return (
    <Layout documentHead={documentHead}>
      <OrderFinalized nauticalOrderByToken={data.nauticalOrderByToken} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();

  const token = context.query?.token ?? "";
  const variables: OrderFinalizedPageQueryVariables = {
    token,
  };
  const { data } = await client.query<OrderFinalizedPageQuery>({
    query: OrderFinalizedPageDocument,
    variables,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title, url);
  const documentHead: DocumentHead = {
    branding: data.branding,
    description,
    title: `${title} Order Finalized`,
    schema,
    image: data.branding?.logo?.url ?? "",
    url,
  };

  return {
    props: {
      data,
      documentHead,
      __APOLLO__,
    },
  };
};

export default Checkout;
