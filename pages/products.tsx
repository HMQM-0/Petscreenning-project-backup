import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { default as ProductsPage } from "components/templates/ProductsPage/Products";
import {
  ProductsPageDocument,
  ProductsPageQuery,
  ProductsPageQueryVariables,
} from "@generated";
import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import { PRODUCTS_PER_PAGE } from "core/config";
import { getProductQueryVariablesFromContext } from "core/utils";

const Products: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const description = "All Products";
  const title = "All Products";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dasboard
    type: "product.products",
  };

  return (
    // @ts-ignore TODO: BE issue BrandingFragment cannot be null | undefined
    <Layout documentHead={documentHead}>
      <ProductsListView>
        {(props) => <ProductsPage {...props} />}
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();
  const { sortBy, after, attributes } =
    getProductQueryVariablesFromContext(context);

  const variables: ProductsPageQueryVariables = {
    after,
    attributes,
    sortBy,
    pageSize: PRODUCTS_PER_PAGE,
  };

  const { data } = await client.query<ProductsPageQuery>({
    query: ProductsPageDocument,
    variables,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      __APOLLO__,
    },
  };
}

export default Products;
