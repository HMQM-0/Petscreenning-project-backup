import type { NextPage, InferGetStaticPropsType } from "next";

import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import View from "components/templates/ProductsPage/View";

const Products: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
}) => {
  const description = "All Products";
  const title = "All Products";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dasboard
    type: "product.products",
  };

  return (
    <Layout documentHead={documentHead}>
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

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
    },
  };
}

export default Products;
