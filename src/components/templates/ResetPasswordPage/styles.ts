import { styled } from "src/styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const GeneralError = styled.p`
  color: ${(props) => props.theme.colors.error} !important;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem auto;
`;
