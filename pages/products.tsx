import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type {
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import builderConfig from "config/builder";
import {
  ProductsPageDocument,
  ProductsPageQuery,
} from "components/templates/ProductsPage/queries.graphql.generated";
import { default as ProductsPage } from "components/templates/ProductsPage/Products";
import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

const Products: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  builderContent,
}) => {
  const description = "All Products";
  const title = "All Products";
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
      <ProductsListView>
        <ProductsPage pageData={data} builderContent={builderContent} />
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = getApolloClient();

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    // get.promise() may return `undefined`. Setting it to `null` in this case to prevent errors in next.js
    // https://github.com/vercel/next.js/discussions/11209
    content = await builder.get("store", { url: "/store/products" }).promise() || null;
  }

  const { data } = await client.query<ProductsPageQuery>({
    query: ProductsPageDocument,
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

export default Products;
