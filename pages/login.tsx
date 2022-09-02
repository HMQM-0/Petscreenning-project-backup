import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { useRouter } from "next/router";

import { useAuth } from "nautical-api";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { LoginPage } from "components/templates/LoginPage/LoginPage";
import { LoginPageDocument, LoginPageQuery } from "components/templates/LoginPage/queries.graphql.generated";
import { getSeoURL } from "utils";
import { DocumentHead } from "types";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ documentHead }) => {
  const { push } = useRouter();
  const { user } = useAuth();

  // TODO: Determine if this can be done Server-Side to improve UX
  if (user) {
    push("/checkout");
  }

  return (
    <Layout documentHead={documentHead}>
      <LoginPage />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();

  const { data } = await client.query<LoginPageQuery>({
    query: LoginPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const url = getSeoURL(context);
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title, url);
  const documentHead: DocumentHead = {
    branding: data.branding,
    description,
    title: `${title} Login`,
    schema,
    image: data.branding?.logo?.url ?? "",
    url,
  };

  return {
    props: {
      documentHead,
      __APOLLO__,
    },
  };
};

export default Checkout;
