import { cn } from "@/utils/cn";

export type TabNavigationProps = {
  tabs: { id: number; label: string; stats?: number }[];
  activeTab?: number;
  onTabChange?: (tab: number) => void;
  className?: string;
};

const TabNavigation = ({ tabs, activeTab, onTabChange, className }: TabNavigationProps) => {
  return (
    <div>
      <div
        className={cn(
          "hidden flex-row gap-0.5 w-full border-b border-neutral-600 md:flex",
          className,
        )}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "text-preset-3 text-neutral-50 text-center w-fit cursor-pointer px-4 py-2.5",
              tab.id === activeTab ? "border-b-2 border-lime-500" : "",
            )}>
            <div className="flex flex-row gap-2 items-center">
              {tab.label}
              {tab.stats !== undefined && (
                <div className="h-5 w-5 bg-lime-800 rounded-full p-1 flex items-center justify-center text-preset-6 text-lime-500">
                  {tab.stats}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "flex flex-row gap-0.5 w-full border-b border-neutral-600 md:hidden",
          className,
        )}>
        this should show select
      </div>
    </div>
  );
};

export default TabNavigation;
