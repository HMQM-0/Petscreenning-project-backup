import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { Button } from "@mui/material";

import { useVisibility } from "deprecated/_nautical/hooks/useVisibility";
import { Loader } from "components/atoms/Loader";
import ProductListItem from "components/organisms/ProductListItem";
import { useAuth } from "@nautical/react";
import { useShopContext } from "components/providers/ShopProvider";
import { generateProductUrl } from "core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  const moreButton = useVisibility(
    (visible) => {
      if (!loading) {
        if (visible && canLoadMore) {
          setTimeout(() => {
            onLoadMore();
          }, 500);
        }
      }
    },
    [loading, canLoadMore, products]
  );

  const { loginForPrice } = useShopContext();
  const { user } = useAuth();

  return (
    <>
      <S.List data-test="productList" data-test-id={testingContextId}>
        {products.map((product) => {
          const { id, name } = product;
          return (
            id &&
            name && (
              <Link
                href={generateProductUrl(id, name)}
                key={id}
                passHref
              >
                <a>
                  <ProductListItem
                    wide
                    product={product}
                    loginForPrice={Boolean(loginForPrice && !user)}
                  />
                </a>
              </Link>
            )
          );
        })}
      </S.List>
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <div ref={moreButton}>
              <Button
                variant="contained"
                // testingContext="loadMoreProductsButton"
                color="secondary"
                onClick={onLoadMore}
              >
                <FormattedMessage defaultMessage="More +" />
              </Button>
            </div>
          )
        )}
      </S.Loader>
    </>
  );
};
