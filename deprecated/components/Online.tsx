import * as React from "react";

import { NetworkStatus } from ".";

type OnlineProps = {
  children: React.ReactNode;
};

const Online = ({ children }: OnlineProps) => (
  <NetworkStatus>{(online) => (online ? children : null)}</NetworkStatus>
);

export default Online;
