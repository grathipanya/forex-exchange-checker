import IconStar from "@/assets/images/icon-star.svg";
import IconStarFilled from "@/assets/images/icon-star-filled.svg";
import { Label } from "@/components/atoms/label";
import { ButtonIcon } from "@/components/molecules/button-icon";
import Button from "@/components/atoms/button/button";
import { cn } from "@/utils/cn";

export type ConverterFooterProps = {
  exchangeRateInfo: string;
  isFavourite: boolean;
  onFavouriteToggle: () => void;
  onLogConversion?: () => void;
};

const ConverterFooter = ({
  exchangeRateInfo,
  isFavourite,
  onFavouriteToggle,
  onLogConversion,
}: ConverterFooterProps) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <Label className="text-preset-5 text-neutral-50">{exchangeRateInfo}</Label>

      <div className="flex flex-row gap-3">
        <ButtonIcon
          blackIcon={isFavourite}
          className={cn(
            "text-preset-5-medium text-neutral-50",
            isFavourite && "text-neutral-900 bg-lime-500",
          )}
          icon={isFavourite ? IconStarFilled : IconStar}
          text={isFavourite ? "Favourited" : "Favourite"}
          onClick={onFavouriteToggle}
        />
        <Button
          className="text-preset-5-medium text-neutral-50"
          text="Log Conversion"
          onClick={onLogConversion}
        />
      </div>
    </div>
  );
};

export default ConverterFooter;
