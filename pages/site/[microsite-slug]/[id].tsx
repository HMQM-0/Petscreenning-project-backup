import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getGraphqlIdFromDBId } from "core/utils";
import MicrositeProducts from "components/templates/MicrositePage/MicrositeProducts";
import {
  MicrositePageDocument,
  MicrositePageQuery,
} from "components/templates/MicrositePage/queries.graphql.generated";
import builderConfig from "config/builder";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import NotFound from "components/molecules/NotFound";
import { IS_SSR } from "utils";

const Microsite: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data, builderContent }) => {
  const URL = IS_SSR ? "" : location.href;
  const description = data.microsite?.seoDescription || "Microsite";
  const title = data.microsite?.seoTitle || data.microsite?.name || "Microsite";
  const schema = structuredData(description, title, URL);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
    type: "microsites.microsite",
  };

  const microsite = data.microsite;

  return (
    <Layout documentHead={documentHead}>
      {microsite ? (
        <ProductsListView>
          <MicrositeProducts microsite={microsite} pageData={data} builderContent={builderContent} />
        </ProductsListView>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const client = getApolloClient();
  const micrositeId = context.params?.id ?? "";

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = (await builder.get("store", { url: "/store/microsite" }).promise()) || null;
  }

  const { data } = await client.query<MicrositePageQuery>({
    query: MicrositePageDocument,
    variables: {
      id: getGraphqlIdFromDBId(micrositeId, "Microsite"),
    },
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      builderContent: content,
      __APOLLO__,
    },
  };
}

export default Microsite;
