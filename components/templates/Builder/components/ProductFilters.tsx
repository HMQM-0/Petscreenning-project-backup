import { Builder } from "@builder.io/react";
import { Typography } from "@mui/material";
import React from "react";

import { ProductFiltersButton } from "components/organisms/ProductListHeader/components/ProductFiltersButton";
import { ProductsPageAttributeFragment } from "components/templates/ProductsList/queries.graphql.generated";
import { FilterSidebar } from "components/organisms";

export const ProductFilters = ({ attributes }: { attributes?: ProductsPageAttributeFragment[] }) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  if (!attributes) {
    return isEditingOrPreviewing ? <Typography>MISSING ATTRIBUTES BINDING</Typography> : null;
  }

  return (
    <>
      <ProductFiltersButton openFiltersMenu={() => setShowFilters(!showFilters)} />
      <FilterSidebar
        show={showFilters}
        hide={() => setShowFilters(false)}
        attributes={attributes}
      />
    </>
  );
};
