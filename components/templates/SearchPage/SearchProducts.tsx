import { BuilderContent } from "@builder.io/sdk";
import React from "react";
import { StringParam, useQueryParam } from "next-query-params";

import Builder from "components/templates/ProductsList/Builder";
import { SearchPageQueryResult } from "components/templates/SearchPage/queries.graphql.generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";
import { useProductsQuery } from "components/templates/ProductsPage/queries.graphql.generated";

type SearchProductsProps = ChildrenFunctionProps & {
  builderContent: BuilderContent | null;
  pageData: SearchPageQueryResult["data"];
};

const SearchProducts = ({
  variables,
  filters,
  pageData,
  builderContent,
}: SearchProductsProps) => {
  const [search] = useQueryParam("q", StringParam);
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      query: search || undefined,
    },
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.attributes.map(({ attribute }) => attribute) ?? [];

  if (builderContent) {
    return <Builder
      type="search"
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
          link: "/search",
          value: "Search",
        },
      ]}
      showSearch
      showNoResultFeaturedProducts
    />
  );
};

export default SearchProducts;
