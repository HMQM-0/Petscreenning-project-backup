import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";

import { DocumentHead } from "src/types";
import { getSsrApolloClient } from "src/apollo-client";
import builderConfig from "src/config/builder";
import { getSeoURL } from "src/utils";
import { IndexPage } from "src/components/templates/IndexPage";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { HomeDocument, HomeQuery } from "src/components/templates/IndexPage/queries.graphql.generated";

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
