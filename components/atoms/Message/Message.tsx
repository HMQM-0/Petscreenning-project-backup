import { Alert, AlertColor, Card, CardHeader, Color } from "@mui/material";
import React from "react";

import { Icon } from "components/atoms/Icon";

import * as S from "./styles";
import { IProps } from "./types";

export const Message: React.FC<IProps> = ({ title, status = "neutral", children, onClick, actionText }: IProps) => {
  const isAction = !!actionText;

  function mapStatusToMaterial(): AlertColor {
    let s: AlertColor = "info";

    if (status === "success") {
      s = "success";
    }

    if (status === "error") {
      s = "error";
    }

    return s;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Alert severity={status === "neutral" ? "info" : status}></Alert>
        </CardHeader>
      </Card>
      <S.Wrapper status={status} data-test="alert">
        <S.TopWrapper>
          <S.Title>{title}</S.Title>
          {isAction ? (
            !children && <S.ActionButton onClick={onClick}>{actionText}</S.ActionButton>
          ) : (
            <S.CloseButton onClick={onClick}>
              <Icon name="x" size={15} />
            </S.CloseButton>
          )}
        </S.TopWrapper>
        {children && <S.Content>{children}</S.Content>}
        {children && isAction && (
          <S.ActionButton onClick={onClick} style={{ marginTop: "1rem" }}>
            {actionText}
          </S.ActionButton>
        )}
      </S.Wrapper>
    </>
  );
};

