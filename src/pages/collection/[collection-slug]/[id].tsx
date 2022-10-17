import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import builderConfig from "src/config/builder";
import { getGraphqlIdFromDBId } from "src/core/utils";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getApolloClient } from "src/apollo-client";
import { ProductsListView } from "src/components/templates/ProductsList/View";
import NotFound from "src/components/molecules/NotFound";
import { default as CollectionProducts } from "src/components/templates/CollectionPage/CollectionProducts";
import {
  CollectionPageDocument,
  CollectionPageQuery,
  CollectionPageQueryVariables,
} from "src/components/templates/CollectionPage/queries.graphql.generated";
import { getSeoURL } from "src/utils";

const Collection: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  documentHead,
  builderContent,
}) => {
  const collection = data.collection;

  return (
    <Layout documentHead={documentHead}>
      {collection ? (
        <ProductsListView>
          <CollectionProducts
            collection={collection}
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
  const collectionId = context.params?.id ?? "";

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = (await builder.get("store", { url: "/store/collection" }).promise()) || null;
  }

  const variables: CollectionPageQueryVariables = {
    id: getGraphqlIdFromDBId(collectionId, "Collection"),
  };

  const { data } = await client.query<CollectionPageQuery>({
    query: CollectionPageDocument,
    variables,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = data.collection?.seoDescription || "Collection";
  const title = data.collection?.seoTitle || data.collection?.name || "Collection";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
    type: "product.collection",
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

export default Collection;
