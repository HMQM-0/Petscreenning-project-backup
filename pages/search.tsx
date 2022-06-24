import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type {
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import builderConfig from "config/builder";
import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import SearchProducts from "components/templates/SearchPage/SearchProducts";
import { SearchPageDocument, SearchPageQuery } from "components/templates/SearchPage/queries.graphql.generated";

const Search: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  builderContent,
}) => {
  const description = "Search Products";
  const title = "Search Products";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
    type: "product.search",
  };

  return (
    <Layout documentHead={documentHead}>
      <ProductsListView>
        {(props) => <SearchProducts {...props} pageData={data} builderContent={builderContent} />}
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = getApolloClient();

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = await builder.get("store", { url: "/store/search" }).promise() || null;
  }

  const { data } = await client.query<SearchPageQuery>({
    query: SearchPageDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      builderContent: content,
      __APOLLO__,
    },
  };
}

export default Search;
