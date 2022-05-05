import { AlertContainer, AlertCustomOptions } from "react-alert";

import { IProps } from "components/atoms/NotificationTemplate/types";

declare module "react-alert" {
  export interface AlertContainerFactory<T> {
    show(message?: IProps["message"], options?: T): AlertInstance;
    info(message?: IProps["message"], options?: T): AlertInstance;
    success(message?: IProps["message"], options?: T): AlertInstance;
    error(message?: IProps["message"], options?: T): AlertInstance;
    remove(alert: AlertInstance): void;
    removeAll(): void;
  }
  export type AlertContainer = AlertContainerFactory<AlertCustomOptions>;
}
