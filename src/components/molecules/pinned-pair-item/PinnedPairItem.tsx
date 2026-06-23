import { cn } from "@/utils/cn";
import { getDifferenceIcon, isValuePositive } from "@/utils/number";
import IconArrowRight from "@/assets/images/icon-arrow-right.svg";
import IconStar from "@/assets/images/icon-star.svg";
import IconStarFilled from "@/assets/images/icon-star-filled.svg";
import { Image } from "@/components/atoms/image";
import Card from "@/components/atoms/card/card";
import { ButtonIcon } from "@/components/molecules/button-icon";
import { useEffect, useRef, useState } from "react";
import { useTickerItemData } from "@/components/organisms/market-ticker/useTickerItemData";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

export type PinnedPairItemProps = {
  currencyPair: {
    base: string;
    quote: string;
  };
  removeFavourite: () => void;
};

const PinnedPairItem = ({
  currencyPair: { base, quote },
  removeFavourite,
}: PinnedPairItemProps) => {
  const setSelectedCurrencyPair = useCurrencyStore((state) => state.setSelectedCurrencyPair);
  const { processedPair } = useTickerItemData({ base, quote });

  const difference = processedPair?.difference || 0;

  const differenceColor = isValuePositive(difference) ? "text-green-500" : "text-red-500";

  const [isRemoving, setIsRemoving] = useState(false);

  const removeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // add a timeout to let the user cancel the remove favourite action
  const handleFavouriteClick = () => {
    if (!isRemoving) {
      setIsRemoving(true);

      removeTimeoutRef.current = setTimeout(() => {
        removeFavourite();
        setIsRemoving(false);
      }, 3000);

      return;
    }

    if (removeTimeoutRef.current) {
      clearTimeout(removeTimeoutRef.current);
      removeTimeoutRef.current = null;
    }

    setIsRemoving(false);
  };

  useEffect(() => {
    if (!removeTimeoutRef.current) return;
    clearTimeout(removeTimeoutRef.current);
  }, []);

  return (
    <Card
      className="hover:cursor-pointer text-preset-5 flex flex-row gap-4 px-4 py-2 border border-neutral-400 bg-neutral-600 items-center justify-between"
      onClick={() => setSelectedCurrencyPair({ base, quote })}>
      <div className="text-neutral-200 flex gap-2">
        {base}
        <Image
          src={IconArrowRight}
          alt="Arrow Right"
          className="h-2.5 w-2.5 my-auto"
        />
        {quote}
      </div>

      <div className="flex items-center flex-row gap-5">
        <div className="flex flex-col items-end">
          <span className="text-neutral-50">{processedPair ? processedPair.rate : 1}</span>
          <span className={cn(differenceColor)}>
            {getDifferenceIcon(difference)} {difference}%
          </span>
        </div>

        <ButtonIcon
          icon={isRemoving ? IconStar : IconStarFilled}
          iconClassName="h-4 w-4"
          onClick={handleFavouriteClick}
          className="ml-auto text-neutral-400 hover:text-neutral-200 p-2"
        />
      </div>
    </Card>
  );
};

export default PinnedPairItem;
