import React from "react";
import Media from "react-media";

import { IconButton } from "src/components/molecules/IconButton";
import { Overlay } from "src/components/atoms/Overlay";
import { xLargeScreen } from "src/styles/constants";

import * as S from "./styles";
import { DirectoryItem, IProps } from "./types";

type ChildItemProps = {
  item: DirectoryItem;
  onClick?: VoidFunction;
};

export const ChildItem = ({ item, onClick }: ChildItemProps) => {
  return (
    <S.ChildItem>
      <S.NavLink
        onClick={onClick}
        fullWidth
        type="side"
        item={item}
      />
    </S.ChildItem>
  );
};

type ListItemProps = {
  item: DirectoryItem;
  onClick?: VoidFunction;
};

export const ListItem = ({ item, onClick }: ListItemProps) => {
  return (
    <>
      <S.ListItem>
        <S.TitleNavButton
          onClick={onClick}
          item={item}
        >
          <S.ListTitle>{item.name}</S.ListTitle>
        </S.TitleNavButton>
      </S.ListItem>
      {item.children && (
        <>
          {item.children?.map((child, index) => (
            <ChildItem
              key={child.id}
              onClick={onClick}
              item={child}
            />
          ))}
          <S.ListBottomBorder />
        </>
      )}
    </>
  );
};

export const ProductSideNavbar = ({ show, onHide, items, target }: IProps) => {
  const handleHide = () => {
    onHide?.(false);
  };

  return (
    <Media query={{ maxWidth: xLargeScreen }}>
      <Overlay
        duration={0}
        position="left"
        show={!!show}
        hide={handleHide}
        target={target}
      >
        <S.Wrapper>
          <S.Header>
            <span>DIRECTORY</span>
            <IconButton
              onClick={() => onHide?.(false)}
              name="x"
              size={18}
              color="000"
              testingContext="sideNavButton"
            />
          </S.Header>
          <S.ListWrapper>
            <S.ListBottomBorder />
            {items?.map((item, index) => (
              <ListItem
                onClick={() => {
                  handleHide();
                }}
                item={item}
                key={index}
              />
            ))}
          </S.ListWrapper>
        </S.Wrapper>
      </Overlay>
    </Media>
  );
};
