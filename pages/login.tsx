import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { useRouter } from "next/router";

import { useAuth } from "nautical-api";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { LoginPage } from "components/templates/LoginPage/LoginPage";
import {
  LoginPageDocument,
  LoginPageQuery,
} from "components/templates/LoginPage/queries.graphql.generated";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const { push } = useRouter();
  const { user } = useAuth();
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.branding?.logo ?? "",
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

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

export const getServerSideProps = async () => {
  const client = getApolloClient();

  const { data } = await client.query<LoginPageQuery>({
    query: LoginPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      __APOLLO__,
    },
  };
};

export default Checkout;
