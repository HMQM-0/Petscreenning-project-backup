import React from "react";

import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";

import { useProductsPageQuery } from "./queries.graphql.generated";

type ProductsProps = ChildrenFunctionProps & {};

const Products = ({ variables, filters }: ProductsProps) => {
  const { loading, data, fetchMore } = useProductsPageQuery({
    variables,
    errorPolicy: "all",
  });

  return (
    <ProductsList
      data={data}
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
