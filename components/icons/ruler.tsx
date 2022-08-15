import React, { FunctionComponent } from "react";

const Ruler: FunctionComponent = () => {
  return (
    <svg viewBox="0 0 15 15" width="15" height="15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.43 13.418a.722.722 0 0 0 .998 0l.722-.723-1.855-1.857a.689.689 0 0 1 .972-.973l1.854 1.858L7.342 10.5 6.204 9.36a.689.689 0 0 1 0-.973.685.685 0 0 1 .97 0l1.14 1.14 1.221-1.222L7.68 6.448a.689.689 0 0 1 0-.973.685.685 0 0 1 .971 0l1.856 1.858 1.22-1.223-1.139-1.14a.689.689 0 0 1 .972-.974l1.14 1.141.72-.723a.7.7 0 0 0 .206-.5.707.707 0 0 0-.206-.501l-1.85-1.85a.702.702 0 0 0-1 0l-8.99 9.002a.701.701 0 0 0-.206.5.7.7 0 0 0 .206.5l1.85 1.853zM9.6.59c.785-.785 2.158-.785 2.942 0l1.85 1.852c.392.393.608.917.608 1.473 0 .557-.216 1.081-.608 1.473l-1.206 1.208-.001.001-6.578 6.586-1.206 1.208c-.393.394-.916.61-1.472.61a2.063 2.063 0 0 1-1.47-.61L.608 12.54A2.071 2.071 0 0 1 0 11.066c0-.558.216-1.081.608-1.473L9.6.59z"
        fill="#000"
        fillRule="evenodd"
      />
    </svg>
  );
};

export { Ruler };
