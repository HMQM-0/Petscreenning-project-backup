import { BuilderContent } from "@builder.io/sdk";
import React from "react";
import dynamic from "next/dynamic";

import { useProductsQuery } from "src/components/templates/ProductsList/queries.graphql.generated";
import { useProductListVariables } from "src/components/templates/ProductsList/View";
import ProductsList from "src/components/templates/ProductsList/ProductsList";
import { slugify } from "src/core/utils";

import { BasicCategoryFragment, CategoryPageQueryResult } from "./queries.graphql.generated";

const Builder = dynamic(() => import("src/components/templates/ProductsList/Builder"), { ssr: false });

type CategoryProductsProps = {
  category: BasicCategoryFragment;
  builderContent: BuilderContent | null;
  pageData: CategoryPageQueryResult["data"];
};

export const extractBreadcrumbs = (category: BasicCategoryFragment) => {
  const constructLink = (item: { name: string; id: string }) => ({
    link: `/category/${slugify(item.name)}/${item.id}/`,
    value: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestorList?.categories.length) {
    const ancestorsList = category.ancestorList.categories.map((edge) => constructLink(edge.category));
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const CategoryProducts = ({ category, pageData, builderContent }: CategoryProductsProps) => {
  const variables = useProductListVariables();
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      categoryIds: [category.id],
    },
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.attributes.map(({ attribute }) => attribute) ?? [];

  if (builderContent) {
    return (
      <Builder
        type="category"
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
      breadcrumbs={extractBreadcrumbs(category)}
      showSidebar
      showNoResultFeaturedProducts
    />
  );
};

export default CategoryProducts;
