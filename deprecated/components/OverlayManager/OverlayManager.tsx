import * as React from "react";

import { OverlayContext, OverlayType } from "components/providers/Overlay/context";

import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import MobileNav from "./MobileNav";
import Modal from "./Modal/Modal";
import Notification from "./Notification";
import Password from "./Password/Password";

import Overlay from "../Overlay/Overlay";

const OverlayManager = () => (
  <OverlayContext.Consumer>
    {(overlay) => {
      switch (overlay.type) {
        case OverlayType.modal:
          return <Modal testingContext="modal" overlay={overlay} />;

        case OverlayType.message:
          return <Notification overlay={overlay} />;

        // TODO: Not working
        // case OverlayType.cart:
        //   return <Cart overlay={overlay} />;

        case OverlayType.login:
          return <Login overlay={overlay} />;

        case OverlayType.register:
          return <Login overlay={overlay} active="register" />;

        case OverlayType.password:
          return <Password overlay={overlay} />;

        case OverlayType.sideNav:
          return <MobileNav overlay={overlay} />;

        case OverlayType.mainMenuNav:
          return <Overlay testingContext="mainMenuOverlay" context={overlay} />;

        default:
          return null;
      }
    }}
  </OverlayContext.Consumer>
);

export default OverlayManager;
