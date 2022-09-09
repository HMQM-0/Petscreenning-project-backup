import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import * as S from "./styles";
import { IProps } from "./types";

export const Overlay: React.FC<IProps> = ({
  children,
  duration = 600,
  hide,
  position = "center",
  show,
  transparent = false,
  testingContext,
  testingContextId,
}: IProps) => {
  const animationProps = {
    open: show,
    position,
  };
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("modal-root");
    setTarget(root);
  }, []);

  return (
    target &&
    ReactDOM.createPortal(
      <Transition
        in={show}
        timeout={duration}
        unmountOnExit
      >
        {(state) => (
          <S.Overlay
            {...animationProps}
            state={state}
            onClick={hide}
            transparent={transparent}
            data-test={testingContext}
            data-test-id={testingContextId}
          >
            <S.Lightbox
              {...animationProps}
              state={state}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </S.Lightbox>
          </S.Overlay>
        )}
      </Transition>,
      target,
    )
  );
};
