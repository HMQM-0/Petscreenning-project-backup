import React from "react";

import { useProductsQuery } from "@generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";

type ProductsProps = ChildrenFunctionProps & {};

const Products = ({
  variables,
  filters,
}: ProductsProps) => {
  const { loading, data, fetchMore } = useProductsQuery({
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
    />
  );
};

export default Products;
