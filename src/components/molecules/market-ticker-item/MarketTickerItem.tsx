import { Label } from "@/components/atoms/label";
import { cn } from "@/utils/cn";

export type MarketTickerItemProps = {
  currencyPair: {
    base: string;
    quote: string;
  };
  rate: number;
  difference: number;
};

const MarketTickerItem = ({ currencyPair, rate, difference }: MarketTickerItemProps) => {
  const isPositive = difference >= 0;
  const differenceIcon = isPositive ? "▲" : "▼";
  const differenceColor = isPositive ? "text-green-500" : "text-red-500";
  return (
    <Label className="flex flex-row gap-4 px-4 py-2 border-x border-neutral-400">
      <div className="text-preset-5 text-neutral-200">
        {currencyPair.base}/{currencyPair.quote}
      </div>
      <div className="text-preset-5 text-neutral-50">{rate}</div>
      <div className={cn("text-preset-5", differenceColor)}>
        {differenceIcon} {difference}%
      </div>
    </Label>
  );
};

export default MarketTickerItem;
