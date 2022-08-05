import { BuilderComponent } from "@builder.io/react";
import React from "react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import useBuilderStateData from "components/hooks/useBuilderStateData";

import { ErrorPageQuery } from "./queries.graphql.generated";

const Builder = ({ content, data, is404 }: { content: BuilderContent; data: ErrorPageQuery; is404: boolean }) => {
  const builderProps = is404 ? { notFound: data } : { error: data };
  const stateData = useBuilderStateData(builderProps);

  return <BuilderComponent model={builderConfig.storeModel} content={content} data={stateData} />;
};

export { Builder };
