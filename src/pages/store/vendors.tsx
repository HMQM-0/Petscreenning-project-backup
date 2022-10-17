import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getApolloClient } from "src/apollo-client";
import NotFound from "src/components/molecules/NotFound";
import VendorsList from "src/components/templates/VendorsPage/Vendors";
import builderConfig from "src/config/builder";
import { VendorsPageDocument, VendorsPageQuery } from "src/components/templates/VendorsPage/queries.graphql.generated";
import { Layout } from "@layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getSeoURL } from "src/utils";

const Vendors: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  documentHead,
  builderContent,
}) => {
  return (
    <Layout documentHead={documentHead}>
      {builderContent ? <VendorsList builderContent={builderContent} /> : <NotFound />}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    // get.promise() may return `undefined`. Setting it to `null` in this case to prevent errors in next.js
    // https://github.com/vercel/next.js/discussions/11209
    content = (await builder.get("store", { url: "/store/vendors" }).promise()) || null;
  }

  const { data } = await client.query<VendorsPageQuery>({
    query: VendorsPageDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = "All Vendors";
  const title = "All Vendors";
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
      builderContent: content,
      __APOLLO__,
    },
  };
}

export default Vendors;
