import Label from "@/components/atoms/label/Label";
import { useMarketTickerData } from "./useMarketTickerData";
import { MarketTickerItem } from "@/components/molecules/market-ticker-item";

const MarketTicker = () => {
  const { compareRates } = useMarketTickerData();

  // TODO REMOVE TEST DATA
  const fallbackRates = [
    { base: "USD", quote: "JPY", rate: 150.25, difference: "-0.5" },
    { base: "GBP", quote: "USD", rate: 1.25, difference: "+0.2" },
    { base: "USD", quote: "CHF", rate: 0.92, difference: "-0.1" },
    { base: "EUR", quote: "GBP", rate: 0.85, difference: "+0.3" },
    { base: "AUD", quote: "USD", rate: 0.75, difference: "-0.4" },
    { base: "USD", quote: "CAD", rate: 1.3, difference: "+0.1" },
    { base: "EUR", quote: "JPY", rate: 130.5, difference: "-0.2" },
  ];

  const tickerRates = compareRates.length ? compareRates : fallbackRates;
  const tickerLoop = [...tickerRates, ...tickerRates];

  return (
    <div className="w-full flex items-stretch">
      {/* Left Anchor */}
      <div className="shrink-0 bg-lime-500 flex items-center gap-1 px-4 py-2">
        <Label>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          <span className="text-preset-5-medium">Live Markets</span>
        </Label>
      </div>
      {/* Marquee */}
      <div className="relative min-w-0 flex-1 overflow-hidden bg-neutral-500">
        <div className="ticker-track">
          {tickerLoop.map((rate, index) => (
            <MarketTickerItem
              key={`${rate.base}-${rate.quote}-${index}`}
              currencyPair={{ base: rate.base, quote: rate.quote }}
              rate={rate.rate}
              difference={rate.difference}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
