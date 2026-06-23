import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";

export type LayoutPropsWithChildren = PropsWithChildren<{
  className?: string;
}>;

const Layout = ({ children, className = "" }: LayoutPropsWithChildren) => (
  <div className={cn("flex flex-col px-42.5 my-12 xl:mx-8 gap-8 mx-0", className)}>{children}</div>
);

export default Layout;
