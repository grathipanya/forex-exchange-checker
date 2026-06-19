import { useState } from "react";
import type { CurrencyPickerModalProps } from "../currency-picker-modal/CurrencyPickerModal";
import { Image } from "@/components/atoms/image";
import IconCheck from "@/assets/images/icon-check.svg";

export type CurrencyPickerListItemProps = {
  selectedCurrency: CurrencyPickerModalProps["selectedCurrency"];
  currency: CurrencyPickerModalProps["availableCurrencies"][number];
  setSelectedCurrency: (
    currency: CurrencyPickerModalProps["selectedCurrency"],
  ) => void;
  onImageStatusChange?: (isoCode: string, isLoaded: boolean) => void;
};

const CurrencyPickerListItem = ({
  selectedCurrency,
  currency,
  setSelectedCurrency,
  onImageStatusChange,
}: CurrencyPickerListItemProps) => {
  const [imageBroken, setImageBroken] = useState(false);

  const { country_code } = currency;

  const isSelectedCurrency = selectedCurrency === currency.iso_code;

  return (
    !imageBroken && (
      <button
        className="w-full text-left px-3 py-2 rounded-6 hover:bg-neutral-100"
        onClick={() => setSelectedCurrency(currency.iso_code)}
      >
        <div className="flex items-center align-center justify-between">
          <div className="flex gap-3 items-center align-center">
            <Image
              src={
                new URL(
                  `/src/assets/images/flags/${country_code.toLowerCase()}.webp`,
                  import.meta.url,
                ).href
              }
              alt={`${currency.iso_code} flag`}
              className="w-5 h-5 inline-block mr-1"
              onLoad={() => onImageStatusChange?.(currency.iso_code, true)}
              onError={() => {
                setImageBroken(true);
                onImageStatusChange?.(currency.iso_code, false);
              }}
            />
            <div className="flex flex-row items-baseline gap-2">
              <span className="text-preset-4 text-neutral-50 ">
                {currency.iso_code}
              </span>
              <span className="text-preset-5 text-neutral-200 ">
                {currency.name}
              </span>
            </div>
          </div>
          {isSelectedCurrency && <Image src={IconCheck} className="w-3 h-3" />}
        </div>
      </button>
    )
  );
};

export default CurrencyPickerListItem;
