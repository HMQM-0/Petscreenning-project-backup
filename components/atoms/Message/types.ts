import React from "react";

export interface IProps {
  title: string;
  status?: "neutral" | "success" | "error";
  onClick: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
  actionText?: string;
}
