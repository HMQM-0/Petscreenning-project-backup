import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WrappedComponentProps } from "react-intl";

import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "./context";

// TODO: What type should be used here?
export function withRouter(Component: any) {
  function ComponentWithRouterProp(props: WrappedComponentProps) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class Provider extends React.Component<any, OverlayContextInterface> {
  notificationCloseDelay = 2500;

  constructor(props: any) {
    super(props);
    this.state = {
      context: null,
      hide: this.hide,
      show: this.show,
      theme: null,
      type: null,
    };
  }

  componentDidUpdate(prevProps: any) {
    if (
      // this.props.history.location.pathname !== prevProps.history.location.pathname &&
      this.props.router.location.pathname !==
      prevProps.router.location.pathname &&
      this.state.type !== OverlayType.message
    ) {
      this.hide();
    }
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme,
    context?: InnerOverlayContextInterface
  ) => {
    this.setState({ type, theme: theme || null, context: context || null });
    document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
    if (type === OverlayType.message) {
      setTimeout(this.hide, this.notificationCloseDelay);
    }
  };

  hide = () => {
    this.setState({ type: null });
    document.body.style.overflow = "";
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default withRouter(Provider);
