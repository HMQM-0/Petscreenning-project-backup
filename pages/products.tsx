import type { NextPage, InferGetServerSidePropsType } from "next";

import { default as ProductsPage } from "components/templates/ProductsPage/Products";
import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

const Products: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ branding }) => {
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
      <ProductsListView>
        {(props) => <ProductsPage {...props} />}
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps() {
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
