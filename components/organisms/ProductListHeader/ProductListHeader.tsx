import React from "react";
import Media from "react-media";
import { Box, Chip } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { commonMessages } from "deprecated/intl";
import { DropdownSelect } from "components/organisms/DropdownSelect";
import { smallScreen, xLargeScreen } from "@styles/constants";
import { Directory } from "components/icons/directory";
import { Filter } from "components/icons/filter";
import { isMicrosite } from "core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader = ({
  numberOfProducts = 0,
  openDirectoryMenu,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Bar>
        <S.LeftSide>
          {!isMicrosite() && (
            <Media query={{ maxWidth: xLargeScreen }}>
              <S.IconButton
                onClick={openDirectoryMenu}
                data-cy="directory__button"
              >
                <Directory />
                <Media query={{ minWidth: smallScreen }}>
                  <S.Filters>DIRECTORY</S.Filters>
                </Media>
              </S.IconButton>
            </Media>
          )}
          <S.FiltersButton onClick={openFiltersMenu} data-cy="filters__button">
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
            <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </S.Clear>
          )}
        </S.LeftSide>
        <S.RightSide>
          <S.Element data-test="productsFoundCounter">
            <S.Label>
              <FormattedMessage defaultMessage="Products found:" />{" "}
            </S.Label>
            {numberOfProducts}
          </S.Element>
          <S.Element>
            <S.Sort>
              <DropdownSelect
                onChange={onChange}
                options={sortOptions}
                value={sortOptions.find(
                  (option) => option.value === activeSortOption
                )}
                isFieldSpacer={false}
              />
            </S.Sort>
          </S.Element>
        </S.RightSide>
      </S.Bar>
      <S.FiltersChipsWrapper>
        {activeFiltersAttributes.map(
          ({ attributeSlug, valueName, valueSlug }) => (
            <Chip
              key={attributeSlug}
              label={valueName}
              onDelete={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
            />
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
  );
};
