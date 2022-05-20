import React from "react";
import { FormattedMessage } from "react-intl";

import { commonMessages } from "deprecated/intl";

import * as S from "./styles";

export const AccountMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>
        <FormattedMessage {...commonMessages.myAccount} />
      </S.MenuHeader>
      {children}
    </S.Wrapper>
  );
};

export const AccountMenuItem = ({
  children,
  active,
  ...rest
}: {
  children: React.ReactNode;
  active: boolean;
}) => {
  return (
    <S.MenuItem active={active} {...rest}>
      {children}
    </S.MenuItem>
  );
};
