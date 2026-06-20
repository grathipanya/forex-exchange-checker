import { cn } from "@/utils/cn";
import type { LabelProps } from "./Label";

const EditLabel = ({ children, className, value, onChange }: LabelProps) => {
  return (
    <input
      value={value ?? (children as string) ?? ""}
      defaultValue={0}
      onChange={onChange}
      className={cn("text-preset-5 text-neutral-50 w-50", className)}
    />
  );
};

export default EditLabel;
