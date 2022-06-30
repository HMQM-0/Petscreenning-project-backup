import { BuilderContent } from "@builder.io/sdk";
import React from "react";

import Builder from "components/templates/ProductsList/Builder";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { useProductListVariables } from "components/templates/ProductsList/View";
import { useProductsQuery } from "components/templates/ProductsPage/queries.graphql.generated";

import {
  BasicCollectionFragment, CollectionPageQueryResult,
} from "./queries.graphql.generated";

type CollectionProductsProps = {
  collection: BasicCollectionFragment;
  builderContent: BuilderContent | null;
  pageData: CollectionPageQueryResult["data"];
};

const CollectionProducts = ({
  collection,
  builderContent,
  pageData,
}: CollectionProductsProps) => {
  const variables = useProductListVariables();
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      collectionIds: [collection.id],
    },
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.attributes.map(({ attribute }) => attribute) ?? [];

  if (builderContent) {
    return <Builder
      type="collection"
      pageData={pageData}
      productsData={data}
      loading={loading}
      attributes={attributes}
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
      variables={variables}
      breadcrumbs={[
        {
          link: `/collection/${collection.slug}/${collection.id}/`,
          value: collection.name,
        },
      ]}
      backgroundImageUrl={collection.backgroundImage?.url}
      showSidebar
      showNoResultFeaturedProducts
    />
  );
};

export default CollectionProducts;
