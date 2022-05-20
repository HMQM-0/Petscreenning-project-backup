import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import { BrandingDocument, BrandingQuery, CollectionDocument, CollectionQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

import { getGraphqlIdFromDBId } from "../../../core/utils";
import { default as CollectionProducts } from "../../../components/templates/CollectionPage/CollectionProducts";
import NotFound from "../../../components/molecules/NotFound";

const Collection: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  branding,
  collectionData,
}) => {
  const description = collectionData.collection?.seoDescription || "Collection";
  const title = collectionData.collection?.seoTitle || collectionData.collection?.name || "Collection";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dashboard
    type: "product.collection",
  };

  const collection = collectionData.collection;

  return (
    <Layout documentHead={documentHead}>
      {collection ? (
        <ProductsListView>
          {(props) => (
            <CollectionProducts
              {...props}
              collection={collection}
            />
          )}
        </ProductsListView>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // TODO: is is always set here (since it's a dynamic routing prop)
  const collectionId = context.params!.id as string;

  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  const { data: collectionData } = await client.query<CollectionQuery>({
    query: CollectionDocument,
    variables: {
      id: getGraphqlIdFromDBId(collectionId, "Collection"),
    },
  });

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      collectionData,
    },
  };
}

export default Collection;
