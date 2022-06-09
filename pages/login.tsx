import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { useRouter } from "next/router";

import { useAuth } from "@nautical/react";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import {
  CheckoutPageDocument,
  CheckoutPageQuery,
} from "components/templates/CheckoutPage/queries.graphql.generated";
import { LoginPage } from "components/templates/LoginPage/LoginPage";

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
    image: "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  // TODO: Determine if this can be done Server-Side to improve UX
  if (user) {
    push("/checkout");
  }

  return (
    // @ts-ignore TODO: BE issue BrandingFragment cannot be null | undefined
    <Layout documentHead={documentHead}>
      <LoginPage />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const client = getApolloClient();

  const { data } = await client.query<CheckoutPageQuery>({
    query: CheckoutPageDocument,
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
