import { BuilderContent } from "@builder.io/sdk";
import { StringParam, useQueryParam } from "next-query-params";
import React from "react";

import { useMicrositesQuery } from "./queries.graphql.generated";
import Builder from "./Builder";

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
