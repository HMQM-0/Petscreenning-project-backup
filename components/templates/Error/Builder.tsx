import { BuilderComponent } from "@builder.io/react";
import React from "react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import useBuilderStateData from "components/hooks/useBuilderStateData";

import { ErrorPageQuery } from "./queries.graphql.generated";

const Builder = ({ content, data }: { content: BuilderContent; data: ErrorPageQuery }) => {
  const stateData = useBuilderStateData({ landing: data });

  return <BuilderComponent model={builderConfig.storeModel} content={content} data={stateData} />;
};

export { Builder };
