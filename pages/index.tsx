import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import { IndexPage } from "components/templates/IndexPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import {
  HomeDocument,
  HomeQuery,
} from "components/templates/IndexPage/queries.graphql.generated";
import { getApolloClient } from "apollo-client";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data, builderContent }) => {
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.shop.homepageCollection?.backgroundImage?.url ?? "",
    url: "",
  };

  return (
    <Layout documentHead={documentHead}>
      <IndexPage data={data} builderContent={builderContent} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const client = getApolloClient();
  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = await builder.get("store", { url: "/store/landing" }).promise() || null;
  }

  const { data } = await client.query<HomeQuery>({
    query: HomeDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      builderContent: content,
      __APOLLO__,
    },
  };
};

export default Home;
