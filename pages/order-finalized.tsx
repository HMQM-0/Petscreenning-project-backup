import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import {
  CheckoutPageDocument,
  CheckoutPageQuery,
} from "components/templates/CheckoutPage/queries.graphql.generated";
import { OrderFinalized } from "components/templates/OrderFinalized";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);
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
      <OrderFinalized />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const client = getApolloClient();

  // TODO: USE ACTUAL QUERY
  const { data } = await client.query<CheckoutPageQuery>({
    query: CheckoutPageDocument,
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
