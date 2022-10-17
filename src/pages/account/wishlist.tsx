import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";

import { getSsrApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { WishlistPage } from "src/components/templates/WishlistPage";
import { AccountSettingsLayout } from "src/components/layouts/AccountSettingsLayout";
import {
  WishlistPageDocument,
  WishlistPageQuery,
} from "src/components/templates/WishlistPage/queries.graphql.generated";

const Wishlist: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ documentHead }) => {
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

  const url = getSeoURL(context);
  const description = "Wishlist";
  const title = "Wishlist";
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

export default Wishlist;
