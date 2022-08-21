import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";

import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getSsrApolloClient } from "apollo-client";
import { WishlistPage } from "components/templates/WishlistPage";
import { AccountSettingsLayout } from "components/layouts/AccountSettingsLayout";
import { WishlistPageDocument, WishlistPageQuery } from "components/templates/WishlistPage/queries.graphql.generated";
import { IS_SSR } from "utils";

const Wishlist: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const URL = IS_SSR ? "" : location.href;
  const description = "Wishlist";
  const title = "Wishlist";
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
        <WishlistPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getSsrApolloClient(context);

  const { data } = await client.query<WishlistPageQuery>({
    query: WishlistPageDocument,
  });

  return {
    props: {
      data,
    },
  };
}

export default Wishlist;
