import { EditLabel } from "@/components/atoms/label";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { CurrencyPickerDropdown } from "@/components/molecules/currency-picker-dropdown";
import type { CurrencyPickerModalProps } from "@/components/molecules/currency-picker-modal/CurrencyPickerModal";
import { cn } from "@/utils/cn";

export type ConverterCurrencyFieldProps = {
  label: "Send" | "Receive";
  availableCurrencies: CurrencyPickerModalProps["availableCurrencies"];
  selectedCurrency: CurrencyPickerModalProps["selectedCurrency"];
  amount: number | string;
  setAmount: (amount: string) => void;
  setSelectedCurrency: (currency: CurrencyPickerModalProps["selectedCurrency"]) => void;
};

const ConverterCurrencyField = ({
  label,
  availableCurrencies,
  selectedCurrency,
  amount,
  setAmount,
  setSelectedCurrency,
}: ConverterCurrencyFieldProps) => {
  const valueLabelStyle = label === "Receive" ? "text-lime-500" : "";

  return (
    <div className="relative w-full">
      <CardWithTitle
        title={label}
        titleLocation="inside"
        className="bg-neutral-600 w-full">
        <div className="flex flex-row justify-between items-baseline">
          <EditLabel
            className={cn("text-preset-1 text-neutral-200", valueLabelStyle)}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}>
            {amount}
          </EditLabel>
          <CurrencyPickerDropdown
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
            availableCurrencies={availableCurrencies}
          />
        </div>
      </CardWithTitle>
    </div>
  );
};

export default ConverterCurrencyField;
