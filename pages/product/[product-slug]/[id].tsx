import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getGraphqlIdFromDBId } from "core/utils";
import builderConfig from "config/builder";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getSsrApolloClient } from "apollo-client";
import NotFound from "components/molecules/NotFound";
import View from "components/templates/ProductPage/View";
import {
  ProductDetailsDocument,
  ProductDetailsQuery,
} from "components/templates/ProductPage/queries.graphql.generated";
import { IS_SSR } from "utils";

const Product: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data: { product, branding },
  builderContent,
}) => {
  const URL = IS_SSR ? "" : location.href;
  const description = product?.seoDescription || product?.descriptionJson || "Product";
  const title = product?.seoTitle || product?.name || "Product";
  const schema = structuredData(description, title, URL);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    image: product?.thumbnail?.url || undefined,
    url: "",
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

  return (
    <Layout documentHead={documentHead}>
      {product ? <View product={product} builderContent={builderContent} /> : <NotFound />}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getSsrApolloClient(context);

  const productId = context.params!.id as string;

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = (await builder.get("store", { url: "/store/product" }).promise()) || null;
  }

  const { data } = await client.query<ProductDetailsQuery>({
    query: ProductDetailsDocument,
    variables: {
      id: getGraphqlIdFromDBId(productId, "Product"),
    },
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

export default Product;
