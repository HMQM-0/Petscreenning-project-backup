import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { useRouter } from "next/router";
import { useQueryParams, BooleanParam, StringParam } from "next-query-params";
import { useState } from "react";

import { useAuth, useCheckout } from "nautical-api";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import {
  CheckoutPageDocument,
  CheckoutPageQuery,
} from "src/components/templates/CheckoutPage/queries.graphql.generated";
import { CheckoutPage } from "src/components/templates/CheckoutPage";
import { Logo } from "src/components/atoms/Logo";
import { getPayment, getSeoURL, IS_SSR } from "src/utils";
import { DocumentHead } from "src/types";
import { getApolloClient } from "src/apollo-client";

const Checkout: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data, documentHead }) => {
  const { push } = useRouter();
  const { user } = useAuth();
  const { loaded, lines } = useCheckout();
  const payment = getPayment();
  const [hasFailedFinalizingPayment, setHasFailedFinalizingPayment] = useState(false);

  const [{ payment_intent, payment_intent_client_secret, guest }] = useQueryParams({
    payment_intent: StringParam,
    payment_intent_client_secret: StringParam,
    guest: BooleanParam,
  });

  const isFinalizingPayment =
    !hasFailedFinalizingPayment && ((payment_intent && payment_intent_client_secret) || payment?.token);
  const redirectToCart = !isFinalizingPayment && loaded && (!lines || lines.length === 0);
  if (!IS_SSR) {
    if (redirectToCart) {
      push("/cart");
    }
    if (!user && !guest && !isFinalizingPayment && !redirectToCart) {
      push("/login");
    }
  }

  const logo = <Logo {...data.branding} />;

  return (
    <Layout documentHead={documentHead}>
      <CheckoutPage
        logo={logo}
        setHasFailedFinalizingPayment={setHasFailedFinalizingPayment}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();

  const { data } = await client.query<CheckoutPageQuery>({
    query: CheckoutPageDocument,
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
    image: data.branding?.logo?.url ?? "",
    url,
  };

  return {
    props: {
      data,
      documentHead,
      __APOLLO__,
    },
  };
};

export default Checkout;
