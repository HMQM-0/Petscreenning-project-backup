// This component will be deleted - we will use the useBuilderStateData hook instead and pass the values directly to BuilderComponent from the builder package

import "./mui";
import * as React from "react";
import { BuilderComponent } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import dynamic from "next/dynamic";

type ArticlePageProps = {
  builderContent: BuilderContent | null;
};

const NoComponent: React.FunctionComponent = () => {
  return <>404</>;
};

const ArticlePage = ({ builderContent }: ArticlePageProps) => {
  if (!builderContent) {
    return <NoComponent />;
  } else {
    return (
      <BuilderComponent
        model="article"
        content={builderContent}
      />
    );
  }
};

export default ArticlePage;
