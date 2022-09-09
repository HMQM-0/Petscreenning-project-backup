import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import { IndexPage } from "components/templates/IndexPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { HomeDocument, HomeQuery } from "components/templates/IndexPage/queries.graphql.generated";
import { getSsrApolloClient } from "apollo-client";
import { DocumentHead } from "types";
import { getSeoURL } from "utils";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data,
  builderContent,
  documentHead,
}) => {
  return (
    <Layout documentHead={documentHead}>
      <IndexPage
        data={data}
        builderContent={builderContent}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getSsrApolloClient(context);
  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    content = (await builder.get("store", { url: "/store/landing" }).promise()) || null;
  }

  const { data } = await client.query<HomeQuery>({
    query: HomeDocument,
    errorPolicy: "all",
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title, url);
  const documentHead: DocumentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.shop.homepageCollection?.backgroundImage?.url ?? "",
    url,
  };

  return {
    props: {
      data,
      documentHead,
      builderContent: content,
      __APOLLO__,
    },
  };
};

export default Home;
