import { TabNavigation } from "@/components/molecules/tab-navigation";
import type { TabNavigationProps } from "@/components/molecules/tab-navigation/TabNavigation";
import { lazy, useState } from "react";

// TODO export to data hook and fetch real counts for favourites and log
const DETAILS_TABS = [
  { id: 0, label: "History" },
  { id: 1, label: "Compare" },
  { id: 2, label: "Favourites" },
  { id: 3, label: "Log" },
] as TabNavigationProps["tabs"];

// Lazy load modules
const HistoryChart = lazy(() => import("../history-chart/HistoryChart"));

const CurrencyDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <TabNavigation
        tabs={DETAILS_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === 0 && <HistoryChart />}
    </div>
  );
};

export default CurrencyDetails;
