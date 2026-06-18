import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";

export type LayoutPropsWithChildren = PropsWithChildren<{
  className?: string;
}>;

const Layout = ({ children, className = "" }: LayoutPropsWithChildren) => (
  <div className={cn("px-42.5 my-12 mx-8", className)}>{children}</div>
);

export default Layout;
