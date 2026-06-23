import { Card } from "@/components/atoms/card";
import { Label } from "@/components/atoms/label";
import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";

export type CardWithTitleProps = PropsWithChildren<{
  title: string;
  titleLocation?: "inside" | "outside";
  info?: string;
  className?: string;
  titleClassName?: string;
  infoClassName?: string;
  footer?: React.ReactNode;
}>;

const CardWithTitle = ({
  title,
  titleLocation = "outside",
  className = "",
  titleClassName = "",
  info,
  infoClassName = "text-preset-5 text-neutral-50",
  children,
  footer,
}: CardWithTitleProps) => {
  return (
    <Card className={cn(`flex flex-col gap-4`, className)}>
      {titleLocation === "outside" && (
        <div className={cn("text-preset-4 text-neutral-50 uppercase", titleClassName)}>{title}</div>
      )}
      <Card className={cn("bg-neutral-700 p-5 gap-5 flex flex-col", className)}>
        {titleLocation === "inside" && (
          <div className="flex justify-between">
            <div className={cn("text-preset-4 text-neutral-50 uppercase", titleClassName)}>
              {title}
            </div>
            <Label className={cn("flex items-center", infoClassName)}>{info}</Label>
          </div>
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
