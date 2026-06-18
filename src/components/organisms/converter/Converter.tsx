import Button from "@/components/atoms/button/button";
import { Label } from "@/components/atoms/label";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { CurrencyPicker } from "@/components/molecules/currency-picker";
import { useConverterData } from "./useConverterData";

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
        <CardWithTitle
          title="Send"
          titleLocation="inside"
          className="bg-neutral-600 w-full">
          <div className="flex flex-row justify-between items-baseline">
            <Label className="text-preset-1 text-neutral-200">0</Label>
            <CurrencyPicker
              selectedCurrency={""}
              onCurrencyChange={function (currency: string): void {
                // console.log(currency);
                // throw new Error("Function not implemented.");
              }}
              availableCurrencies={availableCurrencies}
            />
          </div>
        </CardWithTitle>

        {/* Switch */}
        <Button
          text="Switch"
          onClick={() => {
            console.log("hello!");
          }}
        />

        {/* Receive */}
        <CardWithTitle
          title="Receive"
          titleLocation="inside"
          className="bg-neutral-600 w-full">
          <div className="flex flex-row justify-between items-baseline">
            <Label className="text-preset-1 text-neutral-200">0</Label>
            <div>currency picker</div>
          </div>
        </CardWithTitle>
      </div>
    </CardWithTitle>
  );
};

export default Converter;
