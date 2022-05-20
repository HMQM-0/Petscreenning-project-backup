import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import { BrandingDocument, BrandingQuery, CategoryDocument, CategoryQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

import { getGraphqlIdFromDBId } from "../../../core/utils";
import { default as CategoryProducts } from "../../../components/templates/CategoryPage/CategoryProducts";

const Category: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  branding,
  categoryData,
  categoryId,
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

  console.log('category', categoryData.category);

  return (
    <Layout documentHead={documentHead}>
      <ProductsListView>
        {(props) => (
          <CategoryProducts
            {...props}
            id={categoryId}
            // TODO: category should always be set?
            category={categoryData.category!}
          />
        )}
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // TODO: is is always set here (since it's a dynamic routing prop)
  const categoryId = context.params!.id as string;

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
      id: getGraphqlIdFromDBId(categoryId, "Category"),
    },
  });

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      categoryData,
      categoryId,
    },
  };
}

export default Category;
