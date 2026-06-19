import type { Currency } from "@/types/currency";
import { SearchInput } from "../search-input";
import { useState } from "react";
import Label from "@/components/atoms/label/Label";
import CurrencyPickerListItem from "../currency-picker-list-item/CurrencyPickerListItem";

export type CurrencyPickerModalProps = {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  //iso code is AUD, USD, JPY | country_code is iso_code minus the currency, e.g AU, US, JP
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
          className="fixed z-[9999] bg-neutral-600 p-2 rounded-6 border border-neutral-400 mt-2"
          style={{
            top: position.top,
            right: position.right,
          }}>
          <SearchInput
            value={searchInput}
            label={"Search currencies..."}
            onChange={(value: string) => setSearchInput(value)}
          />
          <div>
            {popularCurrencies && <Label>popularCurrencies</Label>}
            {/* <CurrencyPickerListItem /> */}
            {otherCurrencies && <Label>otherCurrencies</Label>}
          </div>
        </div>
      )}
    </>
  );
};

export default CurrencyPickerModal;
