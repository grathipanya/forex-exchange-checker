import { Label } from "@/components/atoms/label";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { CurrencyPicker } from "@/components/molecules/currency-picker";
import CurrencyPickerModal from "@/components/molecules/currency-picker-modal/CurrencyPickerModal";
import { useRef, useState } from "react";

export type ConverterCurrencyFieldProps = {
  label: "Send" | "Receive";
  availableCurrencies: {
    iso_code: string;
    country_code: string;
    name: string;
  }[];
};

const ConverterCurrencyField = ({ label, availableCurrencies }: ConverterCurrencyFieldProps) => {
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [currency, setCurrency] = useState(availableCurrencies[0]?.iso_code || "AED");

  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      <CardWithTitle
        title={label}
        titleLocation="inside"
        className="bg-neutral-600 w-full">
        <div className="flex flex-row justify-between items-baseline">
          <Label className="text-preset-1 text-neutral-200">0</Label>
          <div
            className="relative inline-block"
            ref={buttonRef}>
            <CurrencyPicker
              selectedCurrency={currency}
              selectedCountryCode={
                availableCurrencies.find((c) => c.iso_code === currency)?.country_code || "AED"
              }
              onCurrencyChange={setCurrency}
              availableCurrencies={availableCurrencies}
              onOpen={() => {
                if (buttonRef.current) {
                  const rect = buttonRef.current.getBoundingClientRect();

                  setPos({
                    top: rect.bottom,
                    right: window.innerWidth - rect.right,
                  });
                }

                setModalOpen((prev) => !prev);
              }}
            />
            <CurrencyPickerModal
              selectedCurrency={currency}
              onCurrencyChange={setCurrency}
              availableCurrencies={availableCurrencies}
              isOpen={modalOpen}
              position={pos}
            />
          </div>
        </div>
      </CardWithTitle>
    </div>
  );
};

export default ConverterCurrencyField;
