import { Select } from "@/components/atoms/select";
import type { Currency } from "@/types/currency";

export type CurrencyPickerProps = {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  //iso code is AUD, USD, JPY | country_code is iso_code minus the currency, e.g AU, US, JP
  availableCurrencies: {
    iso_code: Currency["iso_code"];
    country_code: string;
    name: Currency["name"];
  }[];
};

const CurrencyPicker = ({
  selectedCurrency,
  onCurrencyChange,
  availableCurrencies,
}: CurrencyPickerProps) => {
  return (
    <Select
      options={availableCurrencies.map(({ iso_code, country_code, name }) => ({
        value: iso_code,
        label: iso_code,
        country_code,
        name,
        dropdownLabel: (
          <div>
            <div>flag: {country_code}</div>
            <div>currency: {iso_code}</div>
            <div>name: {name}</div>
          </div>
        ),
      }))}
      value={selectedCurrency}
      onChange={onCurrencyChange}
    />
  );
};

export default CurrencyPicker;
