import React from "react";

import { BasicCollectionFragment, useProductsQuery } from "@generated";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";

type CollectionProductsProps = ChildrenFunctionProps & {
  collection: BasicCollectionFragment
};

const CollectionProducts = ({
  variables,
  filters,
  collection,
}: CollectionProductsProps) => {

  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      collectionIds: [collection.id],
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
      breadcrumbs={([
        {
          link: `/collection/${collection.slug}/${collection.id}/`,
          value: collection.name,
        }
      ])}
      backgroundImageUrl={collection.backgroundImage?.url}
      showSidebar
    />
  );
};

export default CollectionProducts;
