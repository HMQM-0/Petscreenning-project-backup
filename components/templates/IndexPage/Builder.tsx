import { BuilderComponent } from "@builder.io/react";
import React from "react";

import useBuilderStateData from "components/hooks/useBuilderStateData";
import { BuilderHomeQuery } from "@generated";

const Builder = ({
  builderContent,
  builderData,
}: {
  builderContent: any;
  builderData: BuilderHomeQuery;
}) => {
  const stateData = useBuilderStateData({ landing: builderData });

  return (
    <BuilderComponent
      model={"store"}
      content={builderContent}
      data={stateData}
    />
  );
};

export { Builder };
