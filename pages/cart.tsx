import type {
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { CartPage } from "components/templates/CartPage/CartPage";
import { CartPageDocument, CartPageQuery } from "components/templates/CartPage/queries.graphql.generated";
import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";

const Cart: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const description = "Cart";
  const title = "Cart";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
  };

  return (
    <Layout documentHead={documentHead}>
      <CartPage />
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = getApolloClient();

  const { data } = await client.query<CartPageQuery>({
    query: CartPageDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      __APOLLO__,
    },
  };
}

export default Cart;
