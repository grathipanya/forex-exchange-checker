import IconExchange from "@/assets/images/icon-exchange.svg";
import Button from "@/components/atoms/button/button";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { useConverterData } from "./useConverterData";
import { ConverterCurrencyField } from "@/components/molecules/converter-currency-field";
import { useState } from "react";
import type { Currency } from "@/types/currency";
import { ButtonIcon } from "@/components/molecules/button-icon";
import { Label } from "@/components/atoms/label";

const Converter = () => {
  const [sendCurrency, setSendCurrency] = useState<Currency["iso_code"]>("AED");
  const [receiveCurrency, setReceiveCurrency] =
    useState<Currency["iso_code"]>("AED");

  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [lastEditedAmount, setLastEditedAmount] = useState<
    "send" | "receive" | "swap"
  >("send");

  const {
    availableCurrencies,
    exchangeRateInfo,
    conversionAmount: { sendToReceive, receiveToSend },
    exchangeRate,
  } = useConverterData({
    baseCurrency: sendCurrency,
    quoteCurrency: receiveCurrency,
    sendAmount: parseFloat(sendAmount),
    receiveAmount: parseFloat(receiveAmount),
  });

  const displayedSendAmount =
    lastEditedAmount != "send" ? receiveToSend : sendAmount;
  const displayedReceiveAmount =
    lastEditedAmount != "receive" ? sendToReceive : receiveAmount;

  const handleSwap = () => {
    setLastEditedAmount("swap");
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
    setSendAmount(receiveAmount);
    setReceiveAmount(sendAmount);
  };

  const handleSendAmountChange = (amount: string) => {
    console.log("send amount: ", amount);
    setLastEditedAmount("send");
    setSendAmount(amount);
    setReceiveAmount((parseFloat(amount) * exchangeRate).toFixed(2));
  };

  const handleReceiveAmountChange = (amount: string) => {
    setLastEditedAmount("receive");
    console.log("receive amount: ", amount);
    setReceiveAmount(amount);
    setSendAmount((parseFloat(amount) / exchangeRate).toString());
  };

  const footer = () => (
    <div className="flex flex-row justify-between items-center">
      <Label className="text-preset-5 text-neutral-50">
        {exchangeRateInfo}
      </Label>
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
          amount={displayedSendAmount}
          setAmount={handleSendAmountChange}
          setSelectedCurrency={setSendCurrency}
        />

        {/* Switch */}
        <ButtonIcon
          icon={IconExchange}
          leadingIcon
          onClick={handleSwap}
          className="flex-none w-12 h-12"
        />

        {/* Receive */}
        <ConverterCurrencyField
          label="Receive"
          availableCurrencies={availableCurrencies}
          selectedCurrency={receiveCurrency}
          amount={displayedReceiveAmount}
          setAmount={handleReceiveAmountChange}
          setSelectedCurrency={setReceiveCurrency}
        />
      </div>
    </CardWithTitle>
  );
};

export default Converter;
