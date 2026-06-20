import { EditLabel } from "@/components/atoms/label";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { CurrencyPicker } from "@/components/molecules/currency-picker";
import CurrencyPickerModal, {
  type CurrencyPickerModalProps,
} from "@/components/molecules/currency-picker-modal/CurrencyPickerModal";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";

export type ConverterCurrencyFieldProps = {
  label: "Send" | "Receive";
  availableCurrencies: CurrencyPickerModalProps["availableCurrencies"];
  selectedCurrency: CurrencyPickerModalProps["selectedCurrency"];
  amount: number | string;
  setAmount: (amount: string) => void;
  setSelectedCurrency: (
    currency: CurrencyPickerModalProps["selectedCurrency"],
  ) => void;
};

const ConverterCurrencyField = ({
  label,
  availableCurrencies,
  selectedCurrency,
  amount,
  setAmount,
  setSelectedCurrency,
}: ConverterCurrencyFieldProps) => {
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);

  const valueLabelStyle = label === "Receive" ? "text-lime-500" : "";

  return (
    <div className="relative w-full">
      <CardWithTitle
        title={label}
        titleLocation="inside"
        className="bg-neutral-600 w-full"
      >
        <div className="flex flex-row justify-between items-baseline">
          <EditLabel
            className={cn("text-preset-1 text-neutral-200", valueLabelStyle)}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          >
            {amount}
          </EditLabel>
          <div className="relative inline-block" ref={buttonRef}>
            <CurrencyPicker
              selectedCurrency={selectedCurrency}
              selectedCountryCode={
                availableCurrencies.find((c) => c.iso_code === selectedCurrency)
                  ?.country_code || "AED"
              }
              onCurrencyChange={setSelectedCurrency}
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
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
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
