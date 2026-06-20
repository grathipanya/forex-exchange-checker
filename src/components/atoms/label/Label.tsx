import { cn } from "@/utils/cn";
import { useState, type PropsWithChildren } from "react";

export type LabelProps = PropsWithChildren<{
  text?: string;
  className?: string;
}>;

const Label = ({ children, className }: LabelProps) => {
  return (
    <label
      className={cn("inline-flex items-center gap-1.5 uppercase", className)}
    >
      {children}
    </label>
  );
};

const EditLabel = ({ children, className }: LabelProps) => {
  const [value, setValue] = useState(children as string);
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn("text-preset-5 text-neutral-50 w-50", className)}
    />
  );
};

export { Label, EditLabel };
