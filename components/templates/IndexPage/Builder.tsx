import { BuilderComponent } from "@builder.io/react";
import React from "react";
import { BuilderContent } from "@builder.io/sdk";

import builderConfig from "config/builder";
import useBuilderStateData from "components/hooks/useBuilderStateData";
import { BuilderHomeQuery } from "@generated";

const Builder = ({
  builderContent,
  builderData,
}: {
  builderContent: BuilderContent;
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
