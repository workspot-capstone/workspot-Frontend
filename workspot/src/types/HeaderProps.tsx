import type { ReactNode } from "react";

export type HeaderProps = {
  title: string;
  content: ReactNode;
  extraContent?: ReactNode;
  contentClassName?: string;
}