import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import {
  CategoryPageDocument,
  CategoryPageQuery,
  CategoryPageQueryVariables,
} from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import { PRODUCTS_PER_PAGE } from "core/config";

import { getProductQueryVariablesFromContext } from "../../../core/utils";
import { default as CategoryProducts } from "../../../components/templates/CategoryPage/CategoryProducts";
import NotFound from "../../../components/molecules/NotFound";

const Category: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const description = data.category?.seoDescription || "Category";
  const title = data.category?.seoTitle || data.category?.name || "Category";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dashboard
    type: "product.category",
  };

  const category = data.category;

  return (
    // @ts-ignore TODO: BE issue BrandingFragment cannot be null | undefined
    <Layout documentHead={documentHead}>
      {category ? (
        <ProductsListView>
          {(props) => <CategoryProducts {...props} category={category} />}
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

  const { sortBy, after, attributes } =
    getProductQueryVariablesFromContext(context);

  const variables: CategoryPageQueryVariables = {
    id: categoryId,
    after,
    attributes,
    sortBy,
    pageSize: PRODUCTS_PER_PAGE,
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
      __APOLLO__,
    },
  };
}

export default Category;
