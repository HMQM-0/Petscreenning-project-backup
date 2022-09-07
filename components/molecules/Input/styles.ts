import ReactDOM from "react-dom";

import { DefaultTheme, styled } from "styles";

import { activeLabelStyles } from "../../atoms/InputLabel";

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

const getEdgeColor = ({ active, error, disabled, theme }: WrapperProps, hovered = false) => {
  if (disabled) {
    return theme.colors.disabled;
  }

  if (error) {
    return theme.colors.error;
  }

  if (hovered) {
    return theme.colors.secondary;
  }

  return active ? theme.colors.secondary : theme.colors.dark;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: 1px solid ${(props) => getEdgeColor(props)};
  color: ${(props) => getEdgeColor(props)};
  outline: ${(props) => (props.active ? `1px solid ${getEdgeColor(props)};` : "none")};
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => getEdgeColor(props, true)};
    outline-width: ${(props) => (props.disabled ? 0 : 1)}px;
    outline-style: solid;
    border-color: ${(props) => getEdgeColor(props, true)};
    outline-color: ${(props) => getEdgeColor(props, true)};
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<{ labelBackground: string | null }>`
  padding: 0.8rem 1rem;
  margin: 0;
  border: none;
  width: 100%;
  font-size: ${(props) => props.theme.typography.baseFontSize};
  outline: none;
  background-color: transparent;
  &:-webkit-autofill {
    & + label {
      ${(props) => activeLabelStyles(props.theme, props.labelBackground)};
    }
  }
`;

export const getContentWindowHeight = () => {
  const headerRef = document.getElementById("header");
  const footerRef = document.getElementById("footer");
  const headerHeight = headerRef ? headerRef.offsetHeight : 0;
  const footerHeight = footerRef ? footerRef.offsetHeight : 0;

  return window.innerHeight - headerHeight - footerHeight;
};

const DEFAULT_BACKGROUND_COLOR = "#fff";
/**
 * Get the element background color.
 * If no background color is provided then the default is rgba(0, 0, 0, 0)
 * in this case the default color to cover is white (#fff)
 * @param ref Reference to the element to check.
 */
export const getBackgroundColor = (ref: any): string => {
  /* eslint-disable-next-line react/no-find-dom-node */
  const el = ReactDOM.findDOMNode(ref);
  if (el && el.parentElement) {
    if (el.nodeName === "BODY") {
      return DEFAULT_BACKGROUND_COLOR;
    }
    const bgColor = window.getComputedStyle(el.parentElement, null).backgroundColor;

    if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
      return bgColor;
    }

    return getBackgroundColor(el.parentElement);
  }
  return DEFAULT_BACKGROUND_COLOR;
};
