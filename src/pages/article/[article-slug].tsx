import { builder, Builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import dynamic from "next/dynamic";

import builderConfig from "src/config/builder";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { getSsrApolloClient } from "src/apollo-client";
import { BuilderPageDocument, BuilderPageQuery } from "src/components/templates/Builder/queries.graphql.generated";
import { getSeoURL } from "src/utils";

const View = dynamic(() => import("src/components/templates/Builder/ArticlePage"), { ssr: false });

const Article: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  documentHead,
  builderContent,
}) => {
  return (
    <Layout documentHead={documentHead}>
      <View builderContent={builderContent} />
    </Layout>
  );
};

const model = "article";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getSsrApolloClient(context);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  const articleSlug = context.params?.["article-slug"] as string;

  let content: BuilderContent | null = null;
  if (builderConfig.apiKey && !isEditingOrPreviewing) {
    content = (await builder.get(model, { url: `/article/${articleSlug}` }).promise()) || null;
  }

  const { data } = await client.query<BuilderPageQuery>({
    query: BuilderPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = content?.name || "Article";
  const title = content?.data?.title || "Article";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.branding.logo?.url ?? "",
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
}

export default Article;
