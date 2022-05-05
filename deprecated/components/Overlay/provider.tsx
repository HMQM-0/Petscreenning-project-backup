import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WrappedComponentProps } from "react-intl";

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
