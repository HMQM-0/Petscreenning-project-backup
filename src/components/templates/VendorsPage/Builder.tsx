import { BuilderContent } from "@builder.io/sdk";
import { BuilderComponent } from "@builder.io/react";
import * as React from "react";

import useBuilderStateData from "src/components/hooks/useBuilderStateData";
import builderConfig from "src/config/builder";

import { MicrositesQueryResult } from "./queries.graphql.generated";

type BuilderVendorsProps = {
  vendorsData: MicrositesQueryResult["data"];
  content: BuilderContent;
};

const BuilderVendors = ({ vendorsData, content }: BuilderVendorsProps) => {
  const stateData = useBuilderStateData({
    vendors: vendorsData,
  });

  const vendorsList = vendorsData?.microsites?.edges.map((edge) => edge.node) ?? [];

  return (
    <BuilderComponent
      model={builderConfig.storeModel}
      content={content}
      data={{
        ...stateData,
        // TODO: how to force users to use this one instead of legacy `vendors` on builder.io side?
        vendorsList,
      }}
    />
  );
};

export default BuilderVendors;
