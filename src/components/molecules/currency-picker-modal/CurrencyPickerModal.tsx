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

  const popularCurrencies = ["USD", "EUR", "GBP"];
  const otherCurrencies = availableCurrencies.filter(
    (c) => !popularCurrencies.includes(c.iso_code),
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-9999 bg-neutral-600 p-2 rounded-6 border border-neutral-400 mt-2"
          style={{
            top: position.top,
            right: position.right,
          }}>
          <SearchInput
            value={searchInput}
            label={"Search currencies..."}
            onChange={(value: string) => setSearchInput(value)}
          />
          <div className="flex flex-col overflow-y-scroll max-h-75 no-scrollbar">
            {popularCurrencies && <Label>popularCurrencies</Label>}
            {otherCurrencies && <Label>otherCurrencies</Label>}
            {availableCurrencies.map((currency, key) => (
              <CurrencyPickerListItem
                key={key}
                currency={currency}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={(selected) => onCurrencyChange(selected)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CurrencyPickerModal;
