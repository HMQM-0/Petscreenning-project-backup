import { AlertType } from "react-alert";

interface IMessage {
  actionText?: string;
  content?: string;
  title: string;
}

interface IOptions {
  type: AlertType;
}

export interface IProps {
  id: string;
  style: React.CSSProperties;
  message: IMessage;
  options: IOptions;
  close: () => void;
}
