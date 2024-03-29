import React from "react";

import { Icon } from "src/components/atoms/Icon";

import * as S from "./styles";
import { IProps } from "./types";

export const OverlayItem = ({ children, selected, testingContextId, disabled, onClick }: IProps) => {
  return (
    <S.Wrapper
      selected={!!selected}
      disabled={!!disabled}
      onClick={onClick}
      data-test="attributeOption"
      data-test-id={testingContextId}
    >
      {children}
      {selected && (
        <Icon
          name="tick"
          size={16}
          data-test="chosenIcon"
        />
      )}
    </S.Wrapper>
  );
};
