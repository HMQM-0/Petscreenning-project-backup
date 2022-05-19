import type { NextPage, InferGetStaticPropsType } from "next";

import View from "components/templates/CategoryPage/View";
import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

const Category: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ branding }) => {
  const description = "Category"; // TODO: insert categoryData.data.category.seoDescription here
  const title = "Category"; // TODO: insert categoryData.data.category.seoTitle here
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dashboard
    type: "product.category",
  };

  return (
    <Layout documentHead={documentHead}>
      {/* TODO: To be replaced with category page */}
      <ProductsListView ProductsComponent={View} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  console.log('brandingData?.branding', brandingData?.branding);

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
    },
  };
}

export async function getStaticPaths() {
  // TODO: Load all available categories here and prepare paths aray
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Category;
