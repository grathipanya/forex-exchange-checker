import { cn } from "@/utils/cn";

export type TabNavigationProps = {
  tabs: { id: number; label: string }[];
  activeTab?: number;
  onTabChange?: (tab: number) => void;
  className?: string;
};

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabNavigationProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-0.5 w-full border-b-1 border-neutral-600",
        className,
      )}
    >
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => onTabChange?.(tab.id)}
          className={cn(
            "text-preset-3 text-neutral-50 text-center w-fit cursor-pointer px-4 py-2.5",
            tab.id === activeTab ? "border-b-2 border-lime-500" : "",
          )}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
