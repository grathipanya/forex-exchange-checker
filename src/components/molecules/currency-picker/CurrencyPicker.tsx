import { Button } from "@/components/atoms/button";
import { Image } from "@/components/atoms/image";
import IconChevronDown from "@/assets/images/icon-chevron-down.svg";
import type { Currency } from "@/types/currency";

export type CurrencyPickerProps = {
  selectedCurrency: Currency["iso_code"];
  selectedCountryCode: string;
  onCurrencyChange: (currency: Currency["iso_code"]) => void;
  //iso code is AUD, USD, JPY | country_code is iso_code minus the currency, e.g AU, US, JP
  availableCurrencies: {
    iso_code: Currency["iso_code"];
    country_code: string;
    name: Currency["name"];
  }[];
  onOpen: () => void;
};

const CurrencyPicker = ({ selectedCurrency, selectedCountryCode, onOpen }: CurrencyPickerProps) => {
  return (
    <>
      <Button
        className=""
        text={
          <div className="flex items-center gap-2">
            {selectedCurrency && (
              <Image
                src={
                  new URL(
                    `/src/assets/images/flags/${selectedCountryCode.toLowerCase()}.webp`,
                    import.meta.url,
                  ).href
                }
                alt={`${selectedCurrency} flag`}
                className="w-5 h-5 inline-block mr-1"
              />
            )}
            <div className="text-preset-4 text-neutral-50">
              {!selectedCurrency ? "Select currency" : selectedCurrency}
            </div>

            <Image
              className="w-4 h-4 inline-block ml-1"
              src={IconChevronDown}
              alt="Chevron Down"
            />
          </div>
        }
        onClick={onOpen}
      />
    </>
  );
};

export default CurrencyPicker;
