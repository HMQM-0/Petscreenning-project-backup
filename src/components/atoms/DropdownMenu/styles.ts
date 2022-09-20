import { styled } from "src/styles";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Content = styled.div`
  box-shadow: ${(props) => props.theme.dropdown.boxShadow};
  background-color: ${(props) => props.theme.dropdown.backgroundColor};

  position: absolute;
  left: auto;
  right: 0;

  ul {
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    font-style: normal;
    padding: 1rem;
    font-weight: normal;
    gap: 8px;
    line-height: ${(props) => props.theme.typography.baseLineHeight};
    align-items: flex-start;

    li {
      width: 100%;
      cursor: pointer;
      white-space: nowrap;
    }
  }
`;
