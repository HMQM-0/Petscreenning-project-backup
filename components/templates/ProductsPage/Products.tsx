import { BuilderContent } from "@builder.io/sdk";
import React from "react";

import Builder from "components/templates/ProductsList/Builder";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";

import { ProductsPageQueryResult, useProductsQuery } from "./queries.graphql.generated";

type ProductsProps = ChildrenFunctionProps & {
  builderContent: BuilderContent | null;
  pageData: ProductsPageQueryResult["data"];
};

const Products = ({ pageData, variables, filters, builderContent }: ProductsProps) => {
  const { loading, data, fetchMore } = useProductsQuery({
    variables,
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.edges.map(({ node }) => node) ?? [];

  if (builderContent) {
    return <Builder
      type="products"
      pageData={pageData}
      productsData={data}
      attributes={attributes}
      loading={loading}
      content={builderContent}
    />;
  }

  return (
    <ProductsList
      data={data}
      attributes={attributes}
      menuResult={pageData?.menu}
      loading={loading}
      fetchMore={fetchMore}
      filters={filters}
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
