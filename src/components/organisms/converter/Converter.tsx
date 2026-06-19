import IconExchange from "@/assets/images/icon-exchange.svg";
import Button from "@/components/atoms/button/button";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { useConverterData } from "./useConverterData";
import { ConverterCurrencyField } from "@/components/molecules/converter-currency-field";
import { useState } from "react";
import type { Currency } from "@/types/currency";
import { ButtonIcon } from "@/components/molecules/button-icon";

const Converter = () => {
  const [sendCurrency, setSendCurrency] = useState<Currency["iso_code"]>("AED");
  const [receiveCurrency, setReceiveCurrency] =
    useState<Currency["iso_code"]>("AED");

  const { availableCurrencies } = useConverterData();

  const footer = () => (
    <div className="flex flex-row justify-between items-center">
      <div className="text-preset-5 text-neutral-50">1 USD = 0.8530 EUR</div>
      <div className="flex flex-row gap-3">
        <Button text="Favourite" />
        <Button text="Log Conversion" />
      </div>
    </div>
  );
  return (
    <CardWithTitle title="CHECK THE RATE" footer={footer()}>
      {/* Send */}
      <div className="flex flex-row justify-between items-center gap-6">
        <ConverterCurrencyField
          label="Send"
          availableCurrencies={availableCurrencies}
          selectedCurrency={sendCurrency}
          setSelectedCurrency={setSendCurrency}
        />

        {/* Switch */}
        <ButtonIcon
          icon={IconExchange}
          leadingIcon
          onClick={() => {
            setSendCurrency(receiveCurrency);
            setReceiveCurrency(sendCurrency);
          }}
          className="flex-none w-12 h-12"
        />

        {/* Receive */}
        <ConverterCurrencyField
          label="Receive"
          availableCurrencies={availableCurrencies}
          selectedCurrency={receiveCurrency}
          setSelectedCurrency={setReceiveCurrency}
        />
      </div>
    </CardWithTitle>
  );
};

export default Converter;
