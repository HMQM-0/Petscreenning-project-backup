import { styled } from "src/styles";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-height: 95vh;
  overflow-y: scroll;
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) => `4rem ${spacing.gutter} 1.8rem ${spacing.gutter}`};
`;
