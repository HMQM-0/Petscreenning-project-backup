import React, { FunctionComponent } from "react";

const CarouselArrow: FunctionComponent = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
    >
      <g
        fill="#3fb4f3"
        fillRule="nonzero"
      >
        <path d="M245.76 377.344L110.643 263.68 245.76 150.016v39.424h20.48v-83.456L78.797 263.68 266.24 421.376V343.04h-20.48v34.304z" />
        <path d="M384 421.376V105.984L196.557 263.68 384 421.376zm-20.48-44.032L228.403 263.68 363.52 150.016v227.328z" />
      </g>
    </svg>
  );
};

export { CarouselArrow };
