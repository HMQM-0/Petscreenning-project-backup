import * as React from "react";

import NetworkStatus from "./NetworkStatus";

type OnlineProps = {
  children: React.ReactNode;
};

const Offline = ({ children }: OnlineProps) => (
  <NetworkStatus>{(online) => (online ? null : children)}</NetworkStatus>
);

export default Offline;
