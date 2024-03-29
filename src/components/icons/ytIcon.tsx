import React, { FunctionComponent } from "react";

const YtIcon: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M16 32c8.837 0 16-7.164 16-16C32 7.162 24.838-.002 16-.002c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16Z"
        />
        <path
          fill="#FFF"
          d="M25.582 11.169a2.513 2.513 0 0 0-1.768-1.78C22.254 8.97 16 8.97 16 8.97s-6.254 0-7.814.42a2.513 2.513 0 0 0-1.768 1.78C6 12.739 6 16.014 6 16.014s0 3.276.418 4.845c.23.866.908 1.52 1.768 1.752 1.56.42 7.814.42 7.814.42s6.254 0 7.814-.42a2.476 2.476 0 0 0 1.768-1.752C26 19.29 26 16.014 26 16.014s0-3.275-.418-4.845Zm-11.628 7.819V13.04l5.228 2.973-5.228 2.974Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="#fff"
            d="M0 0h32v32H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export { YtIcon };
