import React from "react";

import { useProductsQuery } from "@generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ProductsComponentProps } from "components/templates/ProductsList/View";

type ProductsProps = ProductsComponentProps & {};

const View = ({
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

export default View;
