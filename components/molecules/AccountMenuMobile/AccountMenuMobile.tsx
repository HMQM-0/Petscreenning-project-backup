import React from "react";
import { FormattedMessage } from "react-intl";

import { Icon } from "components/atoms/Icon";
import { useHandlerWhenClickedOutside } from "@hooks";

import * as S from "./styles";

export const AccountMenuMobile = ({
  children,
  currentPageTitle,
}: {
  children: React.ReactNode;
  currentPageTitle?: string;
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowMenu(false);
  });

  return (
    <S.Wrapper
      onClick={() => {
        setShowMenu(true);
      }}
      ref={setElementRef()}
    >
      {currentPageTitle}
      <Icon name="select_arrow" size={8} />
      {showMenu && (
        <S.Overlay>
          <S.MenuHeader>
            <FormattedMessage defaultMessage="Go to" />
          </S.MenuHeader>
          {React.Children.toArray(children).map((child, index) => {
            return (
              <div
                onClick={(evt) => {
                  evt.stopPropagation();
                  setShowMenu(false);
                }}
                key={index}
              >
                {child}
              </div>
            );
          })}
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};

export const AccountMenuMobileItem = ({
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
      <Icon name="select_arrow" size={8} />
    </S.MenuItem>
  );
};
