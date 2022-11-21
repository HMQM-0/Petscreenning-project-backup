import { BuilderContent } from "@builder.io/sdk";
import React from "react";
import dynamic from "next/dynamic";

import { useProductsQuery } from "src/components/templates/ProductsList/queries.graphql.generated";
import ProductsList from "src/components/templates/ProductsList/ProductsList";
import { useProductListVariables } from "src/components/templates/ProductsList/View";

import { BasicCollectionFragment, CollectionPageQueryResult } from "./queries.graphql.generated";

const Builder = dynamic(() => import("src/components/templates/ProductsList/Builder"), { ssr: false });

type CollectionProductsProps = {
  collection: BasicCollectionFragment;
  builderContent: BuilderContent | null;
  pageData: CollectionPageQueryResult["data"];
};

const CollectionProducts = ({ collection, builderContent, pageData }: CollectionProductsProps) => {
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
    return (
      <Builder
        type="collection"
        pageData={pageData}
        productsData={data}
        loading={loading}
        attributes={attributes}
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
