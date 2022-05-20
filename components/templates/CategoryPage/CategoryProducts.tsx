import React from "react";

import { useProductsQuery } from "@generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";

import { getGraphqlIdFromDBId } from "../../../core/utils";

type CategoryProductsProps = ChildrenFunctionProps & {
  id: string;
};

const CategoryProducts = ({
  variables,
  filters,
  id,
}: CategoryProductsProps) => {

  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      categoryIds: [getGraphqlIdFromDBId(id, "Category")],
    },
    errorPolicy: "all",
  });

  return (
    <ProductsList
      data={data}
      loading={loading}
      fetchMore={fetchMore}
      filters={filters}
      variables={variables}
      showSidebar
    />
  );
};

export default CategoryProducts;
