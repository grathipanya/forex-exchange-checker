import IconStar from "@/assets/images/icon-star.svg";
import IconStarFilled from "@/assets/images/icon-star-filled.svg";
import Card from "@/components/atoms/card/card";
import { ButtonIcon } from "@/components/molecules/button-icon";
import { useTickerItemData } from "@/components/organisms/market-ticker/useTickerItemData";
import { useConverterData } from "@/components/organisms/converter/useConverterData";
import { Label } from "@/components/atoms/label/";
import { FlagIcon } from "../flag-icon";

export type ComparisonItemProps = {
  currencyPair: {
    base: string;
    quote: string;
  };
  removeFavourite: () => void;
  addFavourite: () => void;
};

const ComparisonItem = ({
  currencyPair: { base, quote },
  removeFavourite,
  addFavourite,
}: ComparisonItemProps) => {
  const { processedPair } = useTickerItemData({ base, quote });

  const { availableCurrencies, isPairFavourite } = useConverterData({
    baseCurrency: base,
    quoteCurrency: quote,
  });

  const availableCurrencyFromSelectedPair = availableCurrencies.filter(
    (currency) => currency.iso_code === quote,
  );

  return (
    <Card className="text-preset-5 flex flex-row gap-4 px-4 py-2 border border-neutral-400 bg-neutral-600 items-center justify-between">
      <div className="flex flex-row items-center gap-5">
        {<FlagIcon iconString={availableCurrencyFromSelectedPair[0]?.country_code} />}

        <div className=" flex-col text-neutral-200 flex gap-2">
          <Label className="text-preset-4 text-neutral-50">
            {availableCurrencyFromSelectedPair[0]?.iso_code}
          </Label>
          <Label className="text-preset-5 text-neutral-200 capitalize">
            {availableCurrencyFromSelectedPair[0]?.name}
          </Label>
        </div>
      </div>

      <div className="flex items-center flex-row gap-5">
        <div className="flex flex-col items-end">
          <span className="text-preset-3 text-neutral-50">
            {processedPair ? (1000 * processedPair.rate).toFixed(2) : 1000}
          </span>
          <span className="text-preset-6 text-neutral-200">
            @ {processedPair ? processedPair.rate.toFixed(2) : 1}
          </span>
        </div>

        <ButtonIcon
          icon={!isPairFavourite ? IconStar : IconStarFilled}
          iconClassName="h-4 w-4"
          onClick={!isPairFavourite ? addFavourite : removeFavourite}
          className="ml-auto text-neutral-400 hover:text-neutral-200 p-2"
        />
      </div>
    </Card>
  );
};

export default ComparisonItem;
