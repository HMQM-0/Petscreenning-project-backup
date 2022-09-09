import React from "react";

import { CardHeader } from "components/molecules/CardHeader";
import { Overlay } from "components/atoms/Overlay";
import { FormFooter } from "components/molecules/FormFooter";

import * as S from "./styles";
import { IProps } from "./types";

const getCancelBtnProps = (action: () => void, text?: string) =>
  text && {
    cancelBtn: {
      action,
      testingContext: "cancelButton",
      text,
    },
  };

const getSubmitBtnProps = (text: string, submitButtonTestingContext: string, action?: () => void) => ({
  submitBtn: action
    ? {
        action,
        testingContext: submitButtonTestingContext,
        text,
      }
    : { testingContext: submitButtonTestingContext, text },
});

export const Modal = ({
  cancelBtnText,
  children,
  disabled,
  hide,
  formId = "modal-submit",
  onSubmit,
  submitBtnText,
  submitButtonTestingContext,
  show,
  target,
  testingContext,
  title,
}: IProps) => {
  return (
    <Overlay
      testingContext={testingContext}
      position="center"
      show={show}
      hide={hide}
      target={target}
    >
      <S.Modal>
        <CardHeader
          divider
          onHide={hide}
        >
          {title}
        </CardHeader>
        <S.Content>{children}</S.Content>
        {submitBtnText && (
          <FormFooter
            divider
            disabled={disabled}
            {...getSubmitBtnProps(submitBtnText, submitButtonTestingContext, onSubmit)}
            {...getCancelBtnProps(hide, cancelBtnText)}
            formId={formId}
          />
        )}
      </S.Modal>
    </Overlay>
  );
};
