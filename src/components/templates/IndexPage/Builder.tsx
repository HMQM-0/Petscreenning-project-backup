import { BuilderComponent } from "@builder.io/react";
import React from "react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "src/config/builder";
import useBuilderStateData from "src/components/hooks/useBuilderStateData";

import { HomeQuery } from "./queries.graphql.generated";

const Builder = ({ content, data }: { content: BuilderContent; data: HomeQuery }) => {
  const stateData = useBuilderStateData({ landing: data });

  return (
    <BuilderComponent
      model={builderConfig.storeModel}
      content={content}
      data={stateData}
    />
  );
};

export default Builder;
