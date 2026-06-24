import { TabNavigation } from "@/components/molecules/tab-navigation";
import type { TabNavigationProps } from "@/components/molecules/tab-navigation/TabNavigation";
import { useGetNumberOfConversionLogs } from "@/stores/useConversionStore";
import { useNumberOfFavourites } from "@/stores/useFavouriteStore";
import { lazy, useState } from "react";

// Lazy load modules
const HistoryChart = lazy(() => import("../history-chart/HistoryChart"));
const Comparison = lazy(() => import("../comparison/Comparison"));
const Favourites = lazy(() => import("../favourites/Favourites"));
const ConversionLog = lazy(() => import("../conversion-log/ConversionLog"));

const CurrencyDetails = () => {
  const [activeTab, setActiveTab] = useState(1);

  // TODO export to data hook and fetch real counts for favourites and log
  const DETAILS_TABS = [
    { id: 0, label: "History" },
    { id: 1, label: "Compare" },
    { id: 2, label: "Favourites", stats: useNumberOfFavourites() },
    { id: 3, label: "Log", stats: useGetNumberOfConversionLogs() },
  ] as TabNavigationProps["tabs"];

  return (
    <div>
      <TabNavigation
        tabs={DETAILS_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="mt-5">
        {activeTab === 0 && <HistoryChart />}
        {activeTab === 1 && <Comparison />}
        {activeTab === 2 && <Favourites />}
        {activeTab === 3 && <ConversionLog />}
      </div>
    </div>
  );
};

export default CurrencyDetails;
