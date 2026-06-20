import { Label } from "@/components/atoms/label";
import { cn } from "@/utils/cn";
import { getDifferenceIcon, isValuePositive } from "@/utils/number";

export type MarketTickerItemProps = {
  currencyPair: {
    base: string;
    quote: string;
  };
  rate: number;
  difference: string;
};

const MarketTickerItem = ({
  currencyPair,
  rate,
  difference,
}: MarketTickerItemProps) => {
  const differenceColor = isValuePositive(difference)
    ? "text-green-500"
    : "text-red-500";
  return (
    <Label className="text-preset-5 flex flex-row gap-4 px-4 py-2 border-x border-neutral-400">
      <div className=" text-neutral-200">
        {currencyPair.base}/{currencyPair.quote}
      </div>
      <div className="text-neutral-50">{rate}</div>
      <div className={cn(differenceColor)}>
        {getDifferenceIcon(difference)} {difference}%
      </div>
    </Label>
  );
};

export default MarketTickerItem;
