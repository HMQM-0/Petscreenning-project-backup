import React from "react";

import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";
import { slugify } from "@utils/core";

import { BasicCategoryFragment } from "./queries.graphql.generated";

import { useProductsQuery } from "../ProductsPage/queries.graphql.generated";

type CategoryProductsProps = ChildrenFunctionProps & {
  category: BasicCategoryFragment;
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

const CategoryProducts = ({ variables, filters, category }: CategoryProductsProps) => {
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      categoryIds: [category.id],
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
      breadcrumbs={extractBreadcrumbs(category)}
      showSidebar
      showNoResultFeaturedProducts
    />
  );
};

export default CategoryProducts;
