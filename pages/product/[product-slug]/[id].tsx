import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { ProductSeoQuery, ProductSeoDocument } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import NotFound from "components/molecules/NotFound";
import View from "components/templates/ProductPage/View";

const Product: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  branding,
  productSeo,
  productId,
}) => {
  const description = productSeo?.seoDescription || productSeo?.descriptionJson || "Product";
  const title = productSeo?.seoTitle || productSeo?.name || "Product";
  const schema = structuredData(description, title);
  const documentHead = {
    // TODO: is should NOT be undefined here. BE issue
    branding: branding!,
    description,
    title,
    schema,
    image: productSeo?.thumbnail?.url || undefined,
    url: "", // TODO: Store the canonical URL either as env or in dashboard
    type: "product.item",
    custom: [
      {
        content: productSeo?.pricing?.priceRange?.start?.gross.amount.toString(),
        property: "product:price:amount",
      },
      {
        content: productSeo?.pricing?.priceRange?.start?.gross.currency,
        property: "product:price:currency",
      },
      {
        content: productSeo?.isAvailable ? "in stock" : "out off stock",
        property: "product:isAvailable",
      },
      {
        content: productSeo?.category?.name,
        property: "product:category",
      },
    ],
  };

  return (
    <Layout documentHead={documentHead}>
      {productSeo ? (
        <View id={productId} />
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();

  // TODO: it is always set here (since it's a dynamic routing prop)
  const productId = context.params!.id as string;

  const { data } = await client.query<ProductSeoQuery>({
    query: ProductSeoDocument,
    variables: {
      id: productId,
    },
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      branding: data.branding,
      productSeo: data.product,
      productId,
      __APOLLO__,
    },
  };
}

export default Product;
