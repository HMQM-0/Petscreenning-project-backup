import React from "react";

import ProductsList from "components/templates/ProductsList/ProductsList";
import { ChildrenFunctionProps } from "components/templates/ProductsList/View";

import {
  BasicCollectionFragment,
  useCollectionPageQuery,
} from "./queries.graphql.generated";

type CollectionProductsProps = ChildrenFunctionProps & {
  collection: BasicCollectionFragment;
};

const CollectionProducts = ({
  variables,
  filters,
  collection,
}: CollectionProductsProps) => {
  const { loading, data, fetchMore } = useCollectionPageQuery({
    variables: {
      ...variables,
      id: collection.id,
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
          link: `/collection/${collection.slug}/${collection.id}/`,
          value: collection.name,
        },
      ]}
      backgroundImageUrl={collection.backgroundImage?.url}
      showSidebar
    />
  );
};

export default CollectionProducts;
