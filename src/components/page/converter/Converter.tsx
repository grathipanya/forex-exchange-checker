import Button from "@/components/atoms/button/button";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { useConverterData } from "./useConverterData";

import { ConverterCurrencyField } from "@/components/organisms/converter-currency-field";

const Converter = () => {
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
    <CardWithTitle
      title="CHECK THE RATE"
      footer={footer()}>
      {/* Send */}
      <div className="flex flex-row justify-between items-center gap-6">
        <ConverterCurrencyField
          label="Send"
          availableCurrencies={availableCurrencies}
        />

        {/* Switch */}
        <Button
          text="Switch"
          onClick={() => {
            // console.log("hello!");
          }}
        />

        {/* Receive */}
        <ConverterCurrencyField
          label="Receive"
          availableCurrencies={availableCurrencies}
        />
      </div>
    </CardWithTitle>
  );
};

export default Converter;
