import * as React from "react";

import classes from "./scss/index.module.scss";

const CostRow: React.FC<{
  mediumScreen: boolean;
  heading: string;
  cost: React.ReactNode;
}> = ({ mediumScreen, heading, cost }) => (
  <tr>
    <td
      colSpan={mediumScreen ? 4 : 3}
      className={classes["cart-table__cost"]}
    >
      {heading}
    </td>
    <td colSpan={2}>{cost}</td>
  </tr>
);

export default CostRow;
