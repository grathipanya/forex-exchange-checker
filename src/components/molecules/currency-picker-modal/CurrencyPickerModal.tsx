import type { Currency } from "@/types/currency";
import { SearchInput } from "../search-input";
import { useState } from "react";
import { Label } from "@/components/atoms/label";
import { CurrencyPickerListItem } from "@/components/molecules/currency-picker-list-item/";

export type CurrencyPickerModalProps = {
  selectedCurrency: Currency["iso_code"];
  onCurrencyChange: (currency: Currency["iso_code"]) => void;
  //iso code is AUD, USD, JPY
  // country_code is iso_code minus the currency, e.g AU, US, JP
  availableCurrencies: {
    iso_code: Currency["iso_code"];
    country_code: string;
    name: Currency["name"];
  }[];
  isOpen: boolean;
  position: { top: number; right: number };
};

const CurrencyPickerModal = ({
  selectedCurrency,
  onCurrencyChange,
  availableCurrencies,
  isOpen = false,
  position,
}: CurrencyPickerModalProps) => {
  const [searchInput, setSearchInput] = useState("");

  const [imageLoadStatus, setImageLoadStatus] = useState<Record<Currency["iso_code"], boolean>>(
    {} as Record<Currency["iso_code"], boolean>,
  );

  const popularCurrencies = ["USD", "EUR", "GBP"];
  const otherCurrencies = availableCurrencies.filter(
    (c) => !popularCurrencies.includes(c.iso_code),
  );
  const loadedOtherCurrenciesCount = otherCurrencies.filter(
    (currency) => imageLoadStatus[currency.iso_code],
  ).length;

  const handleImageStatusChange = (isoCode: Currency["iso_code"], isLoaded: boolean) => {
    setImageLoadStatus((prev) => {
      if (prev[isoCode] === isLoaded) {
        return prev;
      }

      return {
        ...prev,
        [isoCode]: isLoaded,
      };
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-9999 bg-neutral-600 p-2 rounded-6 border border-neutral-400 mt-2 w-80"
          style={{
            top: position.top,
            right: position.right,
          }}>
          <SearchInput
            value={searchInput}
            label={"Search currencies..."}
            onChange={(value: string) => setSearchInput(value)}
          />

          <div className="flex flex-col max-h-75 overflow-y-auto no-scrollbar">
            {popularCurrencies.length > 0 && (
              <div className="border-b border-neutral-500 p-2 text-preset-5 text-neutral-200 flex justify-between">
                <Label>Popular</Label>
                <Label>{popularCurrencies.length}</Label>
              </div>
            )}

            {availableCurrencies
              .filter((c) => popularCurrencies.includes(c.iso_code))
              .map((currency) => (
                <CurrencyPickerListItem
                  key={currency.iso_code}
                  currency={currency}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={onCurrencyChange}
                  onImageStatusChange={handleImageStatusChange}
                />
              ))}

            {otherCurrencies.length > 0 && (
              <div className="border-b border-neutral-500 p-2 text-preset-5 text-neutral-200 flex justify-between">
                <Label>Other Currencies</Label>
                <Label>{loadedOtherCurrenciesCount}</Label>
              </div>
            )}

            {otherCurrencies
              .filter((currency) => {
                if (!searchInput) return true;
                const searchTerm = searchInput.toLowerCase();
                return (
                  currency.iso_code.toLowerCase().includes(searchTerm) ||
                  currency.name.toLowerCase().includes(searchTerm)
                );
              })
              .map((currency) => (
                <CurrencyPickerListItem
                  key={currency.iso_code}
                  currency={currency}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={onCurrencyChange}
                  onImageStatusChange={handleImageStatusChange}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CurrencyPickerModal;
