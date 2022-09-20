import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getGraphqlIdFromDBId } from "src/core/utils";
import MicrositeProducts from "src/components/templates/MicrositePage/MicrositeProducts";
import {
  MicrositePageDocument,
  MicrositePageQuery,
} from "src/components/templates/MicrositePage/queries.graphql.generated";
import builderConfig from "src/config/builder";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getApolloClient } from "src/apollo-client";
import { ProductsListView } from "src/components/templates/ProductsList/View";
import NotFound from "src/components/molecules/NotFound";
import { getSeoURL } from "src/utils";

const Microsite: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  documentHead,
  builderContent,
}) => {
  const microsite = data.microsite;

  return (
    <Layout documentHead={documentHead}>
      {microsite ? (
        <ProductsListView>
          <MicrositeProducts
            microsite={microsite}
            pageData={data}
            builderContent={builderContent}
          />
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

  const url = getSeoURL(context);
  const description = data.microsite?.seoDescription || "Microsite";
  const title = data.microsite?.seoTitle || data.microsite?.name || "Microsite";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
    type: "microsites.microsite",
  };

  return {
    props: {
      data,
      documentHead,
      builderContent: content,
      __APOLLO__,
    },
  };
}

export default Microsite;
