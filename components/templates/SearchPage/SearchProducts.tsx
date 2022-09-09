import { BuilderContent } from "@builder.io/sdk";
import React from "react";
import { StringParam, useQueryParam } from "next-query-params";

import { useProductsQuery } from "components/templates/ProductsList/queries.graphql.generated";
import Builder from "components/templates/ProductsList/Builder";
import { SearchPageQueryResult } from "components/templates/SearchPage/queries.graphql.generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { useProductListVariables } from "components/templates/ProductsList/View";

type SearchProductsProps = {
  builderContent: BuilderContent | null;
  pageData: SearchPageQueryResult["data"];
};

const SearchProducts = ({ pageData, builderContent }: SearchProductsProps) => {
  const [search] = useQueryParam("q", StringParam);
  const variables = useProductListVariables();
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      query: search || undefined,
    },
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.attributes.map(({ attribute }) => attribute) ?? [];

  if (builderContent) {
    return (
      <Builder
        type="search"
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
