import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type LabelProps = PropsWithChildren<{
  text?: string;
  className?: string;
}>;

const Label = ({ children, className }: LabelProps) => {
  return (
    <label className={twMerge("inline-flex items-center gap-1.5 uppercase", className)}>
      {children}
    </label>
  );
};

export default Label;
