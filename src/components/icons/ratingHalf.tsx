import React, { FunctionComponent } from "react";

const RatingHalf: FunctionComponent = () => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
    >
      <path
        fill="none"
        d="M0 0h512v512H0z"
      />
      <g>
        <path
          d="M256.0015 12.53l77.567263 162.411222 178.432518 23.58332-130.492451 123.96047 32.710146 176.987947L256.0015 413.670734 97.784024 499.47296l32.710146-176.987947L.001719 198.524542l178.432519-23.58332L256.0015 12.53z"
          fill="#e6e6e6"
        />
        <path
          d="M256 413.67l-158.22 85.8 32.71-176.986L0 198.524l178.43-23.583L256 12.53v401.14z"
          fill="#ffbe40"
        />
      </g>
    </svg>
  );
};

export { RatingHalf };
