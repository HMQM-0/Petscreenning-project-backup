import { useQueryParam } from "next-query-params";
import React, { useMemo } from "react";
import Media from "react-media";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { FilterQuerySet } from "components/organisms/FilterSidebar";
import { commonMessages } from "core/intl";
import { smallScreen } from "styles/constants";
import { Filter } from "components/icons/filter";

import * as S from "../styles";

type ProductFiltersButtonProps = {
  openFiltersMenu: VoidFunction;
};

export const ProductFiltersButton = ({ openFiltersMenu }: ProductFiltersButtonProps) => {
  const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const activeFilters = useMemo(() => Object.values(attributeFilters).flat().length, [attributeFilters]);

  return (
    <>
      <S.FiltersButton
        onClick={openFiltersMenu}
        data-cy="filters__button"
      >
        <Filter />
        <Media query={{ minWidth: smallScreen }}>
          <S.Filters>
            FILTERS{" "}
            {activeFilters > 0 && (
              <>
                <Box component="span">({activeFilters})</Box>
              </>
            )}
          </S.Filters>
        </Media>
      </S.FiltersButton>
      {activeFilters > 0 && (
        <S.Clear
          onClick={clearFilters}
          data-test="clearFiltersButton"
        >
          <FormattedMessage {...commonMessages.clearFilterHeader} />
        </S.Clear>
      )}
    </>
  );
};
