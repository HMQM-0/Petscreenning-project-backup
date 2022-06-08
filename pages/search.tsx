import type {
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { Layout } from "@layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { ProductsListView } from "components/templates/ProductsList/View";
import SearchProducts from "components/templates/SearchPage/SearchProducts";
import { SearchPageDocument, SearchPageQuery } from "components/templates/SearchPage/queries.graphql.generated";

const Search: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
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
        {(props) => <SearchProducts {...props} />}
      </ProductsListView>
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = getApolloClient();

  const { data } = await client.query<SearchPageQuery>({
    query: SearchPageDocument,
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

export default Search;
