import { default as _Link } from "next/link";

import { styled } from "src/styles";

export const Link = styled(_Link)<{ fullWidth: boolean; activeClassName: string }>`
  position: relative;
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  text-transform: uppercase;
  transition: 300ms;
  z-index: 0;

  ${({ fullWidth }) =>
    fullWidth &&
    `
      display: block;
      width: 100%;
  `}

  &:hover, &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
  }

  /* Active URL styles
  &.${({ activeClassName }) =>
    activeClassName &&
    `
  {
    color: ${({ theme }: any) => theme.colors.primary};
  }
  `} 
  */
`;
