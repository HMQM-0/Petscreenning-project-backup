import * as React from "react";

import NetworkStatus from "../NetworkStatus";

type OfflineProps = {
  children: React.ReactNode;
};

const Offline = ({ children }: OfflineProps) => (
  <NetworkStatus>{(online) => (online ? null : children)}</NetworkStatus>
);

export default Offline;
