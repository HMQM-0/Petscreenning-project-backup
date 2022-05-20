import React from "react";

import { useBuilderHomeQuery } from "@generated";

import StorePage from "../Builder/StorePage";

const Builder = () => {
  const { data } = useBuilderHomeQuery();
  return <StorePage landing={data} />;
};

export { Builder };
