import React from "react";

import { AccountTile } from "./AccountTabTiles/AccountTile";
import { PasswordTile } from "./AccountTabTiles/PasswordTile";
import * as S from "./styles";

const View = () => {
  return (
    <S.Wrapper>
      <AccountTile />
      <PasswordTile />
    </S.Wrapper>
  );
};

export default View;
