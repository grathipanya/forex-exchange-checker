import { Button } from "@/components/atoms/button";
import type { ButtonProps } from "@/components/atoms/button/button";
import { Image } from "@/components/atoms/image";
import { cn } from "@/utils/cn";

export type ButtonIconProps = {
  icon: string;
  leadingIcon?: boolean;
  onClick?: () => void;
  className?: string;
  blackIcon?: boolean;
} & ButtonProps;

const ButtonIcon = ({
  icon,
  leadingIcon,
  onClick,
  className,
  text,
  blackIcon,
}: ButtonIconProps) => {
  return (
    <Button
      onClick={onClick}
      text={text}
      icon={
        <Image
          src={icon}
          alt="Button Icon"
          className={cn("h-5 w-5", blackIcon && "brightness-0")}
        />
      }
      className={cn(
        !leadingIcon && "flex flex-row gap-2 items-center px-3 py-2",
        className,
      )}
    />
  );
};

export default ButtonIcon;
