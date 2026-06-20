import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type CardProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

const Card = ({ className = "", children, onClick }: CardProps) => (
  <div className={cn("rounded-20", className)} onClick={onClick}>
    {children}
  </div>
);

export default Card;
