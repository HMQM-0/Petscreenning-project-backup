import React from "react";

interface NetworkStatusProps {
  children: (online: boolean) => React.ReactNode;
  cb?: (isOnline: boolean) => void;
}

interface NetworkStatusState {
  online: boolean;
}

class NetworkStatus extends React.Component<NetworkStatusProps, NetworkStatusState> {
  state: NetworkStatusState = {
    online: "onLine" in navigator ? navigator.onLine : true,
  };

  componentDidMount() {
    addEventListener("offline", this.updateOnlineStatus);
    addEventListener("online", this.updateOnlineStatus);
    this.updateOnlineStatus();
  }

  componentWillUnmount() {
    removeEventListener("offline", this.updateOnlineStatus);
    removeEventListener("online", this.updateOnlineStatus);
  }

  updateOnlineStatus = () => {
    if (this.props.cb) {
      this.props.cb(navigator.onLine);
    }
    this.setState({ online: navigator.onLine });
  };

  render() {
    return this.props.children(this.state.online);
  }
}

export default NetworkStatus;
