import React from "react";
import Media from "react-media";
import { FormattedMessage } from "react-intl";

import { smallScreen, xLargeScreen } from "styles/constants";
import { Directory } from "components/icons/directory";
import { isMicrosite } from "core/utils";

import { ProductFiltersButton } from "./components/ProductFiltersButton";
import { ActiveProductFilters } from "./components/ActiveProductFilters";
import { Sort } from "./components/Sort";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader = ({ attributes, numberOfProducts = 0, openDirectoryMenu, openFiltersMenu }: IProps) => {
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
          <ProductFiltersButton openFiltersMenu={openFiltersMenu} />
        </S.LeftSide>
        <S.RightSide>
          <S.Element data-test="productsFoundCounter">
            <S.Label>
              <FormattedMessage defaultMessage="Products found:" />{" "}
            </S.Label>
            {numberOfProducts}
          </S.Element>
          <S.Element>
            <Sort />
          </S.Element>
        </S.RightSide>
      </S.Bar>
      <ActiveProductFilters attributes={attributes} />
    </S.Wrapper>
  );
};
