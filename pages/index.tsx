import type { NextPage, InferGetStaticPropsType } from "next";
import { useAlert } from "react-alert";
import styled from "styled-components";
import dynamic from "next/dynamic";

import { SEO } from "@components";
import { BrandingDocument, BrandingQuery, useBrandingQuery } from "@generated";

const Test = dynamic(() => import("components/atoms/Test"), { ssr: false });

import client from "../apollo-client";

const StyledP = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
}) => {
  const alert = useAlert();

  const title = `${branding.id} | Home`;

  return (
    <>
      <SEO title={title} branding={branding} />
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
      <StyledP>Hello World</StyledP>
      <Test />
    </>
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
