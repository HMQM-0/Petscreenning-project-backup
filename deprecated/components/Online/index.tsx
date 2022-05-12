import React from "react";

import NetworkStatus from "components/atoms/NetworkStatus";

type OnlineProps = {
  children: React.ReactNode;
};

const Online = ({ children }: OnlineProps) => {
  return (
    <NetworkStatus>{(online) => (online ? children : null)}</NetworkStatus>
  );
};

export default Online;
