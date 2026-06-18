import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";

export type LabelProps = PropsWithChildren<{
  text?: string;
  className?: string;
}>;

const Label = ({ children, className }: LabelProps) => {
  return (
    <label className={cn("inline-flex items-center gap-1.5 uppercase", className)}>
      {children}
    </label>
  );
};

export default Label;
