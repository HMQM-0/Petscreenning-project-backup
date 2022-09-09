import React from "react";
import { Chip } from "@mui/material";

import { AttributeValue } from "@generated";
import { ProductsPageAttributeFragment } from "components/templates/ProductsList/queries.graphql.generated";
import { useQueryFilters } from "components/organisms/FilterSidebar";

import * as S from "../styles";

export interface ActiveProductFiltersProps {
  attributes: Array<
    Pick<ProductsPageAttributeFragment, "slug"> & {
      values?: Array<Pick<AttributeValue, "slug" | "name">> | null;
    }
  >;
}

export const ActiveProductFilters = ({ attributes }: ActiveProductFiltersProps) => {
  const { queryFilters, onQueryFilterChange } = useQueryFilters();

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      // TODO: a BE issue? Should not be undefined here
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        // values should not be empty. A BE issue?
        ?.values!.find(({ slug }) => valueSlug === slug)?.name as string,
      valueSlug,
    };
  };

  const activeFiltersAttributes = Object.keys(queryFilters).reduce(
    (acc, key) => acc.concat(queryFilters[key].map((valueSlug) => getAttribute(key, valueSlug))),
    [] as { attributeSlug: string; valueName: string; valueSlug: string }[],
  );

  return (
    <S.FiltersChipsWrapper>
      {activeFiltersAttributes.map(({ attributeSlug, valueName, valueSlug }) => (
        <Chip
          key={`${attributeSlug}-${valueSlug}`}
          label={valueName}
          onDelete={() => onQueryFilterChange(attributeSlug, valueSlug, false)}
        />
      ))}
    </S.FiltersChipsWrapper>
  );
};
