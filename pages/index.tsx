import type { NextPage } from "next";
import { useAlert } from "react-alert";
import styled from "styled-components";

const StyledP = styled.div`
  background-color: ${({ theme }) => {
    console.log("theme", theme);
    return theme.colors.dark;
  }};
`;

const Home: NextPage = () => {
  const alert = useAlert();

  return (
    <>
      <div>UOUOUO</div>
      <button
        onClick={() =>
          alert.show(
            {
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
