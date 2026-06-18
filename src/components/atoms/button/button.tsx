import { cn } from "@/utils/cn";

export type ButtonProps = {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

const Button = ({ text, onClick, icon, className }: ButtonProps) => (
  <button
    onClick={onClick}
    className={cn("uppercase", className)}>
    {icon}
    {text}
  </button>
);

export default Button;
