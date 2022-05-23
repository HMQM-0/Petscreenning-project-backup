import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { builder } from "@builder.io/react";

import {
  BrandingDocument,
  BrandingQuery,
  HomeQuery,
  HomeDocument,
  BuilderHomeQuery,
  BuilderHomeDocument,
} from "@generated";
import { IndexPage } from "components/templates/IndexPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";

import client from "../apollo-client";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ branding, homepage, builderContent, builderData }) => {
  const description = homepage?.shop.description ?? "";
  const title = homepage?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    image: homepage.shop.homepageCollection?.backgroundImage?.url ?? "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  return (
    <Layout documentHead={documentHead}>
      <IndexPage
        data={homepage}
        builderContent={builderContent}
        builderData={builderData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: Type this return value
  const content = await builder
    .get("store", { url: "/store/landing" })
    .promise();

  // TODO: Combine these into only one page level SSR query
  const { data: builderHome } = await client.query<BuilderHomeQuery>({
    query: BuilderHomeDocument,
  });
  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });
  const { data: homepageData } = await client.query<HomeQuery>({
    query: HomeDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      homepage: homepageData,
      builderContent: content ?? null,
      builderData: builderHome,
    },
  };
};

export default Home;
