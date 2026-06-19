import { useState } from "react";
import type { CurrencyPickerModalProps } from "../currency-picker-modal/CurrencyPickerModal";
import { Image } from "@/components/atoms/image";
import IconCheck from "@/assets/images/icon-check.svg";

export type CurrencyPickerListItemProps = {
  selectedCurrency: CurrencyPickerModalProps["selectedCurrency"];
  currency: CurrencyPickerModalProps["availableCurrencies"][number];
  setSelectedCurrency: (currency: CurrencyPickerModalProps["selectedCurrency"]) => void;
};

const CurrencyPickerListItem = ({
  selectedCurrency,
  currency,
  setSelectedCurrency,
}: CurrencyPickerListItemProps) => {
  const [imageBroken, setImageBroken] = useState(false);

  const { country_code } = currency;

  const isSelectedCurrency = selectedCurrency === currency.iso_code;

  return (
    !imageBroken && (
      <button
        className="w-full text-left px-3 py-2 rounded-6 hover:bg-neutral-100"
        onClick={() => setSelectedCurrency(currency.iso_code)}>
        <div className="flex items-center justify-between">
          <div>
            <Image
              src={
                new URL(
                  `/src/assets/images/flags/${country_code.toLowerCase()}.webp`,
                  import.meta.url,
                ).href
              }
              alt={`${currency.iso_code} flag`}
              className="w-5 h-5 inline-block mr-1"
              onError={() => setImageBroken(true)}
            />
            {currency.iso_code} - {currency.name}
          </div>
          {isSelectedCurrency && (
            <Image
              src={IconCheck}
              className="w-3 h-3"
            />
          )}
        </div>
      </button>
    )
  );
};

export default CurrencyPickerListItem;
