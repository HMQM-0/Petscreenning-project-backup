import React, { useState } from "react";

import { Icon } from "src/components/atoms/Icon";

import * as S from "./styles";
import { IProps } from "./types";

export const AddToWishlistButton = ({ added, showText = true, onClick = (evt) => null }: IProps) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <S.Wrapper
      added={added}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {added || hover ? (
        <S.WishlistIcon addRightMargin={showText}>
          <Icon
            name="heart_filled"
            size={28}
          />
        </S.WishlistIcon>
      ) : (
        <S.WishlistIcon addRightMargin={showText}>
          <Icon
            name="heart"
            size={38}
          />
        </S.WishlistIcon>
      )}
      {showText ? (added ? `Remove from wishlist` : `Add to wishlist`) : ``}
    </S.Wrapper>
  );
};
