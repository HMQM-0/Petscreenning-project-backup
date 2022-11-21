// import { builder } from "@builder.io/react";
// import { BuilderContent } from "@builder.io/sdk";
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getGraphqlIdFromDBId } from "src/core/utils";
// import builderConfig from "src/config/builder";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getSsrApolloClient } from "src/apollo-client";
import NotFound from "src/components/molecules/NotFound";
import View from "src/components/templates/ProductPage/View";
import {
  ProductDetailsDocument,
  ProductDetailsQuery,
} from "src/components/templates/ProductPage/queries.graphql.generated";
import { getSeoURL } from "src/utils";

const Product: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data: { product },
  documentHead,
  // builderContent,
}) => {
  return (
    <Layout documentHead={documentHead}>
      {product ? (
        <View
          product={product}
          builderContent={null}
        />
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // fetch("https://webhook.site/daa08c40-1170-4d09-9375-5201bb656e76").then(() => {});

  const client = getSsrApolloClient(context);

  const productId = context.params!.id as string;

  // let content: BuilderContent | null = null;
  // if (builderConfig.apiKey) {
  //   content = (await builder.get("store", { url: "/store/product" }).promise()) || null;
  // }

  const { data } = await client.query<ProductDetailsQuery>({
    query: ProductDetailsDocument,
    variables: {
      id: getGraphqlIdFromDBId(productId, "Product"),
    },
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const product = data.product;
  const url = getSeoURL(context);
  const description = product?.seoDescription || product?.descriptionJson || "Product";
  const title = product?.seoTitle || product?.name || "Product";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: product?.thumbnail?.url || undefined,
    url,
    type: "product.item",
    custom: [
      {
        content: product?.pricing?.priceRange?.start?.gross.amount.toString(),
        property: "product:price:amount",
      },
      {
        content: product?.pricing?.priceRange?.start?.gross.currency,
        property: "product:price:currency",
      },
      {
        content: product?.isAvailable ? "in stock" : "out off stock",
        property: "product:isAvailable",
      },
      {
        content: product?.category?.name,
        property: "product:category",
      },
    ],
  };

  return {
    props: {
      data,
      documentHead,
      builderContent: null,
      __APOLLO__,
    },
  };
}

export default Product;
