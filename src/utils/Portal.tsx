import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export type PortalProps = PropsWithChildren<{
  className?: string;
}>;

export const Portal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};
