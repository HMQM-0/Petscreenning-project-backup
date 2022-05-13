import type { NextPage, InferGetStaticPropsType } from "next";

import {
  BrandingDocument,
  BrandingQuery,
  HomeQuery,
  HomeDocument,
} from "@generated";
import { Layout } from "@layout";
import { structuredData } from "components/templates/IndexPage/structuredData";

import client from "../apollo-client";
import { ProductsPage } from "../components/templates/ProductsPage";

const Products: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
  homepage,
}) => {
  const description = "All Products";
  const title = "All Products";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    image: homepage.shop.homepageCollection?.backgroundImage?.url ?? "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
    // TODO: How to pass it properly?
    //meta.type: "product.products",
  };

  return (
    <Layout documentHead={documentHead}>
      <ProductsPage
        // TODO: Where do I get a logo? It is now in the Layout and passed furter
        logo={''}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });
  // TODO: What exactly to load here? HomeQuery on every page?
  const { data: homepageData } = await client.query<HomeQuery>({
    query: HomeDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      homepage: homepageData,
    },
  };
}

export default Products;
