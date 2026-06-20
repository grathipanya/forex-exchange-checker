import { cn } from "@/utils/cn";

export type ButtonProps = {
  text?: string | React.ReactNode;
  onClick?: () => void;
  onBlur?: () => void;
  icon?: React.ReactNode;
  className?: string;
  size?: "thin" | "regular" | "large";
  variant?: "default" | "outline" | "filled" | "text" | "ghost";
};

const Button = ({
  text,
  onClick,
  onBlur,
  icon,
  className,
  size = "regular",
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      onBlur={onBlur}
      className={cn(
        "flex items-center justify-center uppercase bg-neutral-500 p-2.5 rounded-8 border border-neutral-400 hover:bg-neutral-400 focus:outline-2 focus:outline-lime-500 outline-offset-3 hover:cursor-pointer",
        className,
      )}
      {...props}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
