import { CurrencyPicker } from "@/components/molecules/currency-picker";
import CurrencyPickerModal, {
  type CurrencyPickerModalProps,
} from "@/components/molecules/currency-picker-modal/CurrencyPickerModal";
import { useRef, useState } from "react";

export type CurrencyPickerDropdownProps = {
  selectedCurrency: CurrencyPickerModalProps["selectedCurrency"];
  availableCurrencies: CurrencyPickerModalProps["availableCurrencies"];
  onCurrencyChange: (currency: CurrencyPickerModalProps["selectedCurrency"]) => void;
  fallbackCountryCode?: string;
};

const CurrencyPickerDropdown = ({
  selectedCurrency,
  availableCurrencies,
  onCurrencyChange,
  fallbackCountryCode = "AED",
}: CurrencyPickerDropdownProps) => {
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const selectedCountryCode =
    availableCurrencies.find((currency) => currency.iso_code === selectedCurrency)?.country_code ||
    fallbackCountryCode;

  return (
    <div
      className="relative inline-block"
      ref={buttonRef}>
      <CurrencyPicker
        selectedCurrency={selectedCurrency}
        selectedCountryCode={selectedCountryCode}
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
        onCurrencyChange={onCurrencyChange}
        availableCurrencies={availableCurrencies}
        isOpen={modalOpen}
        position={pos}
      />
    </div>
  );
};

export default CurrencyPickerDropdown;
