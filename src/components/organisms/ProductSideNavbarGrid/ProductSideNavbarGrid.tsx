import React from "react";

import { ProductSideNavbarList } from "src/components/organisms/ProductSideNavbar/ProductSideNavbarList";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductSideNavbarGrid = ({ children, menu, matches }: IProps) => {
  return (
    <>
      {matches ? (
        <S.Wrapper>
          <S.Grid>
            <S.Nav>
              {/* A BE issue. items can not contain null like `[null]` */}
              {/* @ts-ignore */}
              <ProductSideNavbarList items={menu?.items} />
            </S.Nav>
            {children}
          </S.Grid>
        </S.Wrapper>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
