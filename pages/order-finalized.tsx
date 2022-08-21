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
import { IS_SSR } from "utils";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const URL = IS_SSR ? "" : location.href;
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title, URL);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.branding?.logo ?? "",
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

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

  return {
    props: {
      data,
      __APOLLO__,
    },
  };
};

export default Checkout;
