import * as React from "react";

import NetworkStatus from "components/atoms/NetworkStatus";

type OnlineProps = {
  children: React.ReactNode;
};

const Offline = ({ children }: OnlineProps) => (
  <NetworkStatus>{(online) => (online ? null : children)}</NetworkStatus>
);

export default Offline;
