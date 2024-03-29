import React, { FunctionComponent } from "react";

const CartAdd: FunctionComponent = () => {
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
      />
      <path
        d="M9 4V14.5"
        stroke="#3EE7CD"
      />
      <path
        d="M14.25 9.25L3.75 9.25"
        stroke="#3EE7CD"
      />
    </svg>
  );
};

export { CartAdd };
