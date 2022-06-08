import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import NotFound from "components/molecules/NotFound";
import { default as CollectionProducts } from "components/templates/CollectionPage/CollectionProducts";
import {
  CollectionPageDocument,
  CollectionPageQuery,
  CollectionPageQueryVariables,
} from "components/templates/CollectionPage/queries.graphql.generated";

const Collection: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const description = data.collection?.seoDescription || "Collection";
  const title =
    data.collection?.seoTitle || data.collection?.name || "Collection";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
    type: "product.collection",
  };

  const collection = data.collection;

  return (
    <Layout documentHead={documentHead}>
      {collection ? (
        <ProductsListView>
          {(props) => <CollectionProducts {...props} collection={collection} />}
        </ProductsListView>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const client = getApolloClient();
  const collectionId = context.params?.id ?? "";

  const variables: CollectionPageQueryVariables = {
    id: collectionId,
  };

  const { data } = await client.query<CollectionPageQuery>({
    query: CollectionPageDocument,
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
}

export default Collection;
