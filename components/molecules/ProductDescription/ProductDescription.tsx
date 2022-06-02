import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import { RichTextContent } from "components/atoms/RichTextContent";
import { useShopContext } from "components/providers/ShopProvider";

import * as S from "./styles";
import { IProps } from "./types";
import { RatingsAndReviews } from "./RatingsAndReviews";

export const ProductDescription = ({
  description = "",
  descriptionJson = "",
  attributes,
  features,
  productId,
  ratingsAndReviewsSectionRef,
}: IProps) => {
  const { activePlugins } = useShopContext();
  const yotpoRatingsAndReviewsPluginActive = !!activePlugins?.some(
    (plugin) => plugin?.identifier === "nautical.reviews.yotpo"
  );

  const filteredAttributes = attributes?.filter((attribute) => attribute.values == []) ?? [];

  return (
    <Box>
      <Typography color="primary" variant="h6">
        DESCRIPTION
      </Typography>
      <Divider />
      <Box pt={1}>
        {descriptionJson ? (
          <RichTextContent descriptionJson={descriptionJson} />
        ) : (
          <p>{description}</p>
        )}
      </Box>
      {!!filteredAttributes.length && (
        <>
          <Box pb={2} />
          <Typography color="primary" variant="h6" style={{ display: "none" }}>
            ATTRIBUTES
          </Typography>
          <Box pt={1}>
            <S.AttributeList>
              {filteredAttributes.map((attribute, index) => (
                <li key={index}>
                  <S.AttributeName>
                    {attribute.attribute.name}:{" "}
                  </S.AttributeName>{" "}
                  {/* // TODO: A BE issue. Adding `!` temporary */}
                  {attribute.values.map((value) => value!.name).join(", ")}
                </li>
              ))}
            </S.AttributeList>
          </Box>
        </>
      )}
      {!!features?.length && (
        <>
          <Box pb={2} />
          <Typography color="primary" variant="h6">
            FEATURES
          </Typography>
          <Divider />
          <Box pt={1}>
            <S.AttributeList>
              {features.map((feature, index) => (
                <li key={index}>
                  {/* // TODO: A BE issue. Adding `!` to fix */}
                  <S.AttributeName>{feature!.name}</S.AttributeName>{" "}
                  <Box pt={1}>{feature!.description}</Box>
                </li>
              ))}
            </S.AttributeList>
          </Box>
        </>
      )}
      {yotpoRatingsAndReviewsPluginActive && (
        <Box ref={ratingsAndReviewsSectionRef}>
          <S.Spacer />
          <S.Title>RATINGS &#38; REVIEWS</S.Title>
          <S.Content>
            <RatingsAndReviews productId={productId} />
          </S.Content>
        </Box>
      )}
    </Box>
  );
};
