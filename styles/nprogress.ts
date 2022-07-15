import { css } from "@emotion/react";

const nprogress = (background: string) => css`
  @import url("https://unpkg.com/nprogress@0.2.0/nprogress.css");

  #nprogress .bar {
    height: 3px;
    background: ${background};
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${background}, 0 0 5px ${background};
  }

  #nprogress .spinner-icon {
    /* Hide the spinner */
    display: none;
  }
`;

export { nprogress };
