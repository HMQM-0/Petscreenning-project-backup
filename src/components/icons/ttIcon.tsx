import React, { FunctionComponent } from "react";

const TtIcon: FunctionComponent = () => {
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
          d="M24.75 14.202a8.209 8.209 0 0 1-4.797-1.534v6.983C19.95 23.134 17.085 26 13.602 26c-3.485 0-6.352-2.867-6.352-6.351s2.867-6.351 6.351-6.351c.292 0 .584.02.873.06v3.512a2.917 2.917 0 0 0-.875-.134 2.93 2.93 0 0 0-2.916 2.915 2.93 2.93 0 0 0 2.916 2.916 2.93 2.93 0 0 0 2.915-2.916V6h3.439c-.003.29.022.58.072.866a4.775 4.775 0 0 0 2.107 3.135 4.745 4.745 0 0 0 2.618.787v3.414Z"
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

export { TtIcon };
