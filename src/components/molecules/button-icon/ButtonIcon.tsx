import { Button } from "@/components/atoms/button";
import { Image } from "@/components/atoms/image";
import { cn } from "@/utils/cn";

export type ButtonIconProps = {
  icon: string;
  leadingIcon?: boolean;
  onClick?: () => void;
  className?: string;
};

const ButtonIcon = ({
  icon,
  leadingIcon,
  onClick,
  className,
}: ButtonIconProps) => {
  return (
    <Button
      onClick={onClick}
      icon={<Image src={icon} alt="Button Icon" className="h-5 w-5" />}
      className={cn(!leadingIcon && "flex-row-reverse", className)}
    />
  );
};

export default ButtonIcon;
