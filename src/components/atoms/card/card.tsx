import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type CardProps = PropsWithChildren<{
  className?: string;
}>;

const Card = ({ className = "", children }: CardProps) => (
  <div className={cn("rounded-20", className)}>{children}</div>
);

export default Card;
