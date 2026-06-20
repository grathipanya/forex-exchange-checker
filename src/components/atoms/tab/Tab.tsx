import { cn } from "@/utils/cn";

export type TabProps = {
  title?: string;
  onClick?: () => void;
  className?: string;
};

const Tab = ({ title, onClick, className }: TabProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "text-preset-3 text-neutral-50 text-center w-fit cursor-pointer px-4 py-2.5",
        className,
      )}
    >
      {title}
    </div>
  );
};

export default Tab;
