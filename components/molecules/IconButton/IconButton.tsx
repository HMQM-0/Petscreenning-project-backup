import React from "react";

import { Icon } from "components/atoms/Icon";

import * as S from "./styles";
import { IProps } from "./types";

export const IconButton = ({
  name,
  color,
  size = 36,
  onClick,
  testingContext,
  testingContextId,
  ...props
}: IProps) => {
  return (
    <S.Wrapper
      data-test={testingContext}
      data-test-id={testingContextId}
      onClick={onClick}
      {...props}
    >
      <Icon name={name} size={size} color={color} />
    </S.Wrapper>
  );
};
