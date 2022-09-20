import type { NextPage, InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import { Error } from "components/templates/Error";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { ErrorPageDocument, ErrorPageQuery } from "components/templates/Error/queries.graphql.generated";
import { getSeoURL } from "utils";
import { DocumentHead } from "types";

import { getApolloClient } from "../apollo-client";

const ErrorPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  documentHead,
  data,
  builderContent,
  is404,
}) => {
  return (
    <Layout documentHead={documentHead}>
      <Error
        builderContent={builderContent}
        data={data}
        is404={is404}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { res } = context;
  const is404 = res.statusCode === 404;
  const client = getApolloClient();
  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    if (is404) {
      content = (await builder.get("store", { url: "/store/notFound" }).promise()) || null;
    } else {
      content = (await builder.get("store", { url: "/store/error" }).promise()) || null;
    }
  }

  let data: ErrorPageQuery = {
    branding: {
      id: "",
      jsonContent: "{}",
      footerText: "",
    },
    shop: {
      name: "",
    },
  };
  try {
    const { data: response } = await client.query<ErrorPageQuery>({
      query: ErrorPageDocument,
    });
    data = response;
  } catch (e) {
    // This is useful for Vercel logs. May want to add Sentry/DataDog logging here in the future.
    console.error("GraphQL Error (ErrorPageQuery):", e);
  }

  const url = getSeoURL(context);
  const description = `Cart`;
  const title = "Cart";
  const schema = structuredData(description, title, url);
  const documentHead: DocumentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
  };

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      documentHead,
      data,
      builderContent: content,
      is404,
      __APOLLO__,
    },
  };
};

export default ErrorPage;
