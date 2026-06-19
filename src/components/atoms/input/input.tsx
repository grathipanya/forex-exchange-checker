import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export type InputProps = ComponentPropsWithoutRef<"input">;
export const BaseInput = ({ className, ...props }: InputProps) => (
  <input
    {...props}
    className={cn(
      "w-full bg-transparent focus:outline-none text-preset-5 text-neutral-50 placeholder:text-neutral-200",
      className,
    )}
  />
);

export default BaseInput;
