import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { DocumentHead } from "src/types";
import { getApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import { CartPage } from "src/components/templates/CartPage/CartPage";
import { CartPageDocument, CartPageQuery } from "src/components/templates/CartPage/queries.graphql.generated";
import { Layout } from "@layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";

const Cart: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ documentHead }) => {
  return (
    <Layout documentHead={documentHead}>
      <CartPage />
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();

  const { data } = await client.query<CartPageQuery>({
    query: CartPageDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = `Cart`;
  const title = "Cart";
  const schema = structuredData(description, title, url);
  const documentHead: DocumentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
  };

  return {
    props: {
      documentHead,
      __APOLLO__,
    },
  };
}

export default Cart;
