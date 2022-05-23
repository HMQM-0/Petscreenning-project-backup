import { BuilderComponent } from "@builder.io/react";
import React from "react";

import builderConfig from "config/builder";
import useBuilderStateData from "components/hooks/useBuilderStateData";
import { BuilderHomeQuery } from "@generated";

const Builder = ({
  builderContent,
  builderData,
}: {
  builderContent: any; // TODO: Type this content object returned from builder
  builderData: BuilderHomeQuery;
}) => {
  const stateData = useBuilderStateData({ landing: builderData });

  return (
    <BuilderComponent
      model={builderConfig.storeModel}
      content={builderContent}
      data={stateData}
    />
  );
};

export { Builder };
