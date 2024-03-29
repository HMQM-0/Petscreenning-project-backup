import React, { FunctionComponent } from "react";

const CartAddDisabled: FunctionComponent = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="9"
        cy="9"
        r="9"
        fill="#F1F5F5"
        fillOpacity="0.5"
      />
      <path
        d="M9 4V14.5"
        stroke="white"
      />
      <path
        d="M14.25 9.25L3.75 9.25"
        stroke="white"
      />
    </svg>
  );
};

export { CartAddDisabled };
