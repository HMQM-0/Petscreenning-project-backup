import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import builderConfig from "src/config/builder";
import { Layout } from "@layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getApolloClient } from "src/apollo-client";
import { ProductsListView } from "src/components/templates/ProductsList/View";
import SearchProducts from "src/components/templates/SearchPage/SearchProducts";
import { SearchPageDocument, SearchPageQuery } from "src/components/templates/SearchPage/queries.graphql.generated";
import { getSeoURL } from "src/utils";

const Search: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  documentHead,
  builderContent,
}) => {
  return (
    <Layout documentHead={documentHead}>
      <ProductsListView>
        <SearchProducts
          pageData={data}
          builderContent={builderContent}
        />
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = (await builder.get("store", { url: "/store/search" }).promise()) || null;
  }

  const { data } = await client.query<SearchPageQuery>({
    query: SearchPageDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = "Search Products";
  const title = "Search Products";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
    type: "product.search",
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

export default Search;
