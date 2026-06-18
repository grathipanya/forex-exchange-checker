import { Card } from "@/components/atoms/card";
import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";

export type CardWithTitleProps = PropsWithChildren<{
  title: string;
  titleLocation?: "inside" | "outside";
  className?: string;
  footer?: React.ReactNode;
}>;

const CardWithTitle = ({
  title,
  titleLocation = "outside",
  className = "",
  children,
  footer,
}: CardWithTitleProps) => {
  return (
    <Card className={cn(`flex flex-col gap-4`, className)}>
      {titleLocation === "outside" && (
        <div className="text-preset-4 text-neutral-50 uppercase">{title}</div>
      )}
      <Card className={cn("bg-neutral-700 p-5 gap-5 flex flex-col", className)}>
        {titleLocation === "inside" && (
          <div className="text-preset-4 text-neutral-50 uppercase">{title}</div>
        )}
        {children}
        {footer && (
          <div className="pt-5 border-t border-dotted border-neutral-500 -mx-5">
            <div className="mx-5">{footer}</div>
          </div>
        )}
      </Card>
    </Card>
  );
};

export default CardWithTitle;
