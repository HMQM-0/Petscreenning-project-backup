import { styled } from "src/styles";

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.light};
  height: 100%;
  padding-left: 3rem;
  padding-top: 2.5rem;
`;

export const MenuHeader = styled.div`
  font-size: ${(props) => props.theme.typography.h3FontSize};
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  text-transform: "uppercase";
  padding-bottom: 2rem;
`;

export const MenuItem = styled.a<{
  active: boolean;
}>`
  display: block;
  cursor: pointer;
  padding-bottom: 1.5rem;
  color: ${(props) => (props.active ? props.theme.colors.activeMenuOption : "")};
`;
