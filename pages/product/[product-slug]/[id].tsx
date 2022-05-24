import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import { BrandingDocument, BrandingQuery, ProductSeoQuery, ProductSeoDocument } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import NotFound from "components/molecules/NotFound";

import View from "../../../components/templates/ProductPage/View";

const Product: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  branding,
  productSeo,
  productId,
}) => {
  const description = productSeo?.seoDescription || productSeo?.descriptionJson || "Product";
  const title = productSeo?.seoTitle || productSeo?.name || "Product";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
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
  // TODO: is is always set here (since it's a dynamic routing prop)
  const productId = context.params!.id as string;

  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  const { data } = await client.query<ProductSeoQuery>({
    query: ProductSeoDocument,
    variables: {
      id: productId,
    },
  });

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      productSeo: data.product,
      productId,
    },
  };
}

export default Product;
