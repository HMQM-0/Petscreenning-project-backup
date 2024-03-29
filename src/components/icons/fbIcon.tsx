import React, { FunctionComponent } from "react";

const FbIcon: FunctionComponent = () => {
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
          d="m19.755 17.93.555-3.619h-3.473v-2.348c0-.99.485-1.956 2.04-1.956h1.58V6.925s-1.433-.244-2.803-.244c-2.86 0-4.73 1.734-4.73 4.872v2.758h-3.18v3.62h3.18v8.75h3.913v-8.75h2.918Z"
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

export { FbIcon };
