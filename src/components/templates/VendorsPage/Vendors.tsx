import { BuilderContent } from "@builder.io/sdk";
import { StringParam, useQueryParam } from "next-query-params";
import dynamic from "next/dynamic";
import React from "react";

import { useMicrositesQuery } from "./queries.graphql.generated";

const Builder = dynamic(() => import("./Builder"), { ssr: false });

type ProductsProps = {
  builderContent: BuilderContent;
};

const Vendors = ({ builderContent }: ProductsProps) => {
  const [search] = useQueryParam("q", StringParam);

  const { data: builderMicrositesData } = useMicrositesQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      first: 100,
      search,
    },
  });
  return (
    <Builder
      vendorsData={builderMicrositesData}
      content={builderContent}
    />
  );
};

export default Vendors;
