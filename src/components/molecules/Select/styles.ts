import { styled } from "src/styles";

export const Wrapper = styled.div<{ isLastFormField: boolean }>`
  margin-bottom: ${(props) => (props.isLastFormField ? props.theme.spacing.fieldSpacer : 0)};
`;

export const Indicator = styled.div<{ rotate: string }>`
  position: absolute;
  right: 1rem;
  transition-duration: 0.3s;
  transform: ${(props) => (props.rotate === "true" ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const HelpText = styled.span`
  color: ${(props) => props.theme.input.labelColor};
  font-size: ${(props) => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  top: 100%;
`;
