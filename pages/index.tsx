import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import { HomeQuery, HomeDocument } from "@generated";
import { IndexPage } from "components/templates/IndexPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";

import client from "../apollo-client";

type HomepageProps = {
  data: HomeQuery;
  builderContent: BuilderContent;
};

const Home: NextPage<HomepageProps> = ({ data, builderContent }) => {
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding, // TODO: BE issue BrandingFragment cannot be null | undefined
    description,
    title,
    schema,
    image: data.shop.homepageCollection?.backgroundImage?.url ?? "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  return (
    <Layout documentHead={documentHead}>
      <IndexPage data={data} builderContent={builderContent} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  let content: BuilderContent | null = null;
  if (builderConfig.apiKey) {
    // TODO: Type this return value
    content = await builder.get("store", { url: "/store/landing" }).promise();
  }

  const { data } = await client.query<HomeQuery>({
    query: HomeDocument,
  });

  return {
    props: {
      data,
      builderContent: content,
    },
  };
};

export default Home;
