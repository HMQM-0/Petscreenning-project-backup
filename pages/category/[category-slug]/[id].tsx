import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import View from "components/templates/CategoryPage/View";
import { BrandingDocument, BrandingQuery, CategoryDocument, CategoryQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

import { getGraphqlIdFromDBId } from "../../../core/utils";

const Category: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  branding,
  categoryData,
}) => {
  const description = categoryData.category?.seoDescription || "Category";
  const title = categoryData.category?.seoTitle || categoryData.category?.name || "Category";
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
      <ProductsListView ProductsComponent={View} />
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  const { data: categoryData } = await client.query<CategoryQuery>({
    query: CategoryDocument,
    variables: {
      id: getGraphqlIdFromDBId(context.params?.id as string, "Category"),
    },
  });

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      categoryData,
    },
  };
}

export default Category;
