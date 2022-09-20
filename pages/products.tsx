import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import builderConfig from "src/config/builder";
import { getApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import {
  ProductsPageDocument,
  ProductsPageQuery,
} from "src/components/templates/ProductsPage/queries.graphql.generated";
import { default as ProductsPage } from "src/components/templates/ProductsPage/Products";
import { Layout } from "@layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { ProductsListView } from "src/components/templates/ProductsList/View";

const Products: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  documentHead,
  builderContent,
}) => {
  return (
    <Layout documentHead={documentHead}>
      <ProductsListView>
        <ProductsPage
          pageData={data}
          builderContent={builderContent}
        />
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    // get.promise() may return `undefined`. Setting it to `null` in this case to prevent errors in next.js
    // https://github.com/vercel/next.js/discussions/11209
    content = (await builder.get("store", { url: "/store/products" }).promise()) || null;
  }

  const { data } = await client.query<ProductsPageQuery>({
    query: ProductsPageDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = "All Products";
  const title = "All Products";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
    type: "product.products",
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

export default Products;
