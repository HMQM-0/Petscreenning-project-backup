import type { NextPage } from "next";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { PWA, Social } from "@components/atoms";

const StyledP = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Home: NextPage = () => {
  const alert = useAlert();

  return (
    <>
      <PWA />
      <Social />
      <div>UOUOUO</div>
      <button
        onClick={() =>
          alert.show(
            {
              // @ts-ignore
              title: "Added 1x pp",
            },
            { type: "success" }
          )
        }
      >
        CLICK
      </button>
      <StyledP>Hello World</StyledP>
    </>
  );
};

export default Home;
