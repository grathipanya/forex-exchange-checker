import { TabNavigation } from "@/components/molecules/tab-navigation";
import type { TabNavigationProps } from "@/components/molecules/tab-navigation/TabNavigation";
import { useNumberOfFavourites } from "@/stores/useFavouriteStore";
import { lazy, useState } from "react";

// Lazy load modules
const HistoryChart = lazy(() => import("../history-chart/HistoryChart"));
const Favourites = lazy(() => import("../favourites/Favourites"));

const CurrencyDetails = () => {
  const [activeTab, setActiveTab] = useState(2);
  const favouriteCount = useNumberOfFavourites();

  // TODO export to data hook and fetch real counts for favourites and log
  const DETAILS_TABS = [
    { id: 0, label: "History" },
    { id: 1, label: "Compare" },
    { id: 2, label: "Favourites", stats: favouriteCount },
    { id: 3, label: "Log", stats: favouriteCount },
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
        {activeTab === 2 && <Favourites />}
      </div>
    </div>
  );
};

export default CurrencyDetails;
