import React from "react";
import { useRouter } from "next/router";

import { useProductsQuery } from "@generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ProductsComponentProps } from "components/templates/ProductsList/View";

import { getGraphqlIdFromDBId } from "../../../core/utils";

type ProductsProps = ProductsComponentProps & {};

const View = ({
  variables,
  filters,
}: ProductsProps) => {
  const { query: { id } } = useRouter();

  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      // TODO: We need to early return if id is not set? Should it be always set here?
      categoryIds: [getGraphqlIdFromDBId(id as string, "Category")],
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

export default View;
