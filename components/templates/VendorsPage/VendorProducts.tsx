import { BuilderContent } from "@builder.io/sdk";
import React from "react";

import { useProductsQuery } from "components/templates/ProductsPage/queries.graphql.generated";
import Builder from "components/templates/ProductsList/Builder";
import { useProductListVariables } from "components/templates/ProductsList/View";

import { VendorsPageQueryResult } from "./queries.graphql.generated";

type ProductsProps = {
  builderContent: BuilderContent;
  pageData: VendorsPageQueryResult["data"];
};

const VendorProducts = ({ pageData, builderContent }: ProductsProps) => {
  const variables = useProductListVariables();
  const { loading, data } = useProductsQuery({
    variables,
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.edges.map(({ node }) => node) ?? [];

  return <Builder
    type="products"
    pageData={pageData}
    productsData={data}
    attributes={attributes}
    loading={loading}
    content={builderContent}
  />;
};

export default VendorProducts;
