import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type {
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import NotFound from "components/molecules/NotFound";
import VendorProducts from "components/templates/VendorsPage/VendorProducts";
import builderConfig from "config/builder";
import {
  VendorsPageDocument,
  VendorsPageQuery,
} from "components/templates/VendorsPage/queries.graphql.generated";
import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

const Vendors: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  builderContent,
}) => {
  const description = "All Sellers";
  const title = "All Sellers";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
    type: "product.products",
  };

  return (
    <Layout documentHead={documentHead}>
      {builderContent ? (
        <ProductsListView>
          <VendorProducts pageData={data} builderContent={builderContent} />
        </ProductsListView>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = getApolloClient();

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    // get.promise() may return `undefined`. Setting it to `null` in this case to prevent errors in next.js
    // https://github.com/vercel/next.js/discussions/11209
    content = await builder.get("store", { url: "/store/vendors" }).promise() || null;
  }

  const { data } = await client.query<VendorsPageQuery>({
    query: VendorsPageDocument,
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

export default Vendors;
