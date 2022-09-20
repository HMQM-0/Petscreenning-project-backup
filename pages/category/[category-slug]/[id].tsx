import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import { getGraphqlIdFromDBId } from "src/core/utils";
import builderConfig from "src/config/builder";
import {
  CategoryPageDocument,
  CategoryPageQuery,
  CategoryPageQueryVariables,
} from "src/components/templates/CategoryPage/queries.graphql.generated";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getApolloClient } from "src/apollo-client";
import { ProductsListView } from "src/components/templates/ProductsList/View";
import { getSeoURL, IS_SSR } from "src/utils";
import { default as CategoryProducts } from "src/components/templates/CategoryPage/CategoryProducts";
import NotFound from "src/components/molecules/NotFound";

const Category: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  documentHead,
  builderContent,
}) => {
  const category = data.category;

  return (
    <Layout documentHead={documentHead}>
      {category ? (
        <ProductsListView>
          <CategoryProducts
            category={category}
            pageData={data}
            builderContent={builderContent}
          />
        </ProductsListView>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const client = getApolloClient();
  const categoryId = context.params?.id ?? "";

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = (await builder.get("store", { url: "/store/category" }).promise()) || null;
  }

  const variables: CategoryPageQueryVariables = {
    id: getGraphqlIdFromDBId(categoryId, "Category"),
  };

  const { data } = await client.query<CategoryPageQuery>({
    query: CategoryPageDocument,
    variables,
    errorPolicy: "all",
  });

  const __APOLLO__ = client.extract();

  const url = getSeoURL(context);
  const description = data.category?.seoDescription || "Category";
  const title = data.category?.seoTitle || data.category?.name || "Category";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
    type: "product.category",
  };

  return {
    props: {
      data,
      documentHead,
      builderContent: content,
      __APOLLO__,
    },
  };
}

export default Category;
