import type { NextPage, InferGetStaticPropsType } from "next";
import { useAlert } from "react-alert";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "@layout";
import { useSetSEO } from "@providers";

import client from "../apollo-client";

const Test = dynamic(() => import("components/atoms/Test"), { ssr: false });

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
}) => {
  const alert = useAlert();
  const setSeo = useSetSEO();

  useEffect(() => {
    setSeo((seo) => ({ ...seo, title: "Home" }));
  }, [setSeo]);

  return (
    <Layout branding={branding}>
      <div>UOUOUO</div>
      <button
        onClick={() =>
          alert.show(
            {
              // @ts-ignore
              title: "Added 1x pp",
            },
            { type: "success" }
          )
        }
      >
        CLICK
      </button>

      <Test />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof data.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  return {
    props: {
      branding: data?.branding ?? fallbackBranding,
    },
  };
}

export default Home;
