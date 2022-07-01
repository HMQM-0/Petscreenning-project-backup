import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import builderConfig from "config/builder";
import {
  CategoryPageDocument,
  CategoryPageQuery,
  CategoryPageQueryVariables,
} from "components/templates/CategoryPage/queries.graphql.generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";

import { default as CategoryProducts } from "../../../components/templates/CategoryPage/CategoryProducts";
import NotFound from "../../../components/molecules/NotFound";

const Category: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  builderContent,
}) => {
  const description = data.category?.seoDescription || "Category";
  const title = data.category?.seoTitle || data.category?.name || "Category";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
    type: "product.category",
  };

  const category = data.category;

  return (
    <Layout documentHead={documentHead}>
      {category ? (
        <ProductsListView>
          {(props) => (
            <CategoryProducts
              {...props}
              category={category}
              pageData={data}
              builderContent={builderContent}
            />
          )}
        </ProductsListView>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const client = getApolloClient();
  const categoryId = context.params?.id ?? "";

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = await builder.get("store", { url: "/store/category" }).promise() || null;
  }

  const variables: CategoryPageQueryVariables = {
    id: categoryId,
  };

  const { data } = await client.query<CategoryPageQuery>({
    query: CategoryPageDocument,
    variables,
    errorPolicy: "all",
  });

  const __APOLLO__ = client.extract();

  return {
    props: {
      data,
      builderContent: content,
      __APOLLO__,
    },
  };
}

export default Category;
