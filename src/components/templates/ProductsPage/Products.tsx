import { BuilderContent } from "@builder.io/sdk";
import React from "react";
import dynamic from "next/dynamic";

import { useProductsQuery } from "src/components/templates/ProductsList/queries.graphql.generated";
import ProductsList from "src/components/templates/ProductsList/ProductsList";
import { useProductListVariables } from "src/components/templates/ProductsList/View";

import { ProductsPageQueryResult } from "./queries.graphql.generated";

const Builder = dynamic(() => import("src/components/templates/ProductsList/Builder"), { ssr: false });

type ProductsProps = {
  builderContent: BuilderContent | null;
  pageData: ProductsPageQueryResult["data"];
};

const Products = ({ pageData, builderContent }: ProductsProps) => {
  const variables = useProductListVariables();
  const { loading, data, fetchMore } = useProductsQuery({
    variables,
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.edges.map(({ node }) => node) ?? [];

  if (builderContent) {
    return (
      <Builder
        type="products"
        pageData={pageData}
        productsData={data}
        attributes={attributes}
        loading={loading}
        content={builderContent}
      />
    );
  }

  return (
    <ProductsList
      data={data}
      attributes={attributes}
      menuResult={pageData?.menu}
      loading={loading}
      fetchMore={fetchMore}
      variables={variables}
      breadcrumbs={[
        {
          link: "/products",
          value: "All Products",
        },
      ]}
    />
  );
};

export default Products;
