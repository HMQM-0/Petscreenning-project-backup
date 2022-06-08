import React from "react";
import { StringParam, useQueryParam } from "next-query-params";

import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";
import { useProductsQuery } from "components/templates/ProductsPage/queries.graphql.generated";

type SearchProductsProps = ChildrenFunctionProps;

const SearchProducts = ({
  variables,
  filters,
}: SearchProductsProps) => {
  const [search] = useQueryParam("q", StringParam);
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      query: search || undefined,
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
      breadcrumbs={[
        {
          link: "/search",
          value: "Search",
        },
      ]}
      showSearch
    />
  );
};

export default SearchProducts;
