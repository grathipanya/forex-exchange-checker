import IconExchange from "@/assets/images/icon-exchange.svg";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { useConverterData } from "./useConverterData";
import { ConverterCurrencyField } from "@/components/molecules/converter-currency-field";
import { useState } from "react";
import type { CountryCode, DateTimeString } from "@/types/currency";
import { ButtonIcon } from "@/components/molecules/button-icon";
import { ConverterFooter } from "@/components/molecules/converter-footer";
import { useGetCurrencyPair } from "@/stores/useCurrencyStore";

const Converter = () => {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [lastEditedAmount, setLastEditedAmount] = useState<"send" | "receive" | "swap">("send");

  const { base, quote } = useGetCurrencyPair();

  const {
    availableCurrencies,
    exchangeRateInfo,
    conversionAmount: { sendToReceive, receiveToSend },
    exchangeRate,
    addFavourite,
    removeFavourite,
    isPairFavourite,
    setSelectedCurrencyBase,
    setSelectedCurrencyQuote,
    setSelectedCurrencyPair,
    logConversion,
  } = useConverterData({
    baseCurrency: base,
    quoteCurrency: quote,
    sendAmount: parseFloat(sendAmount),
    receiveAmount: parseFloat(receiveAmount),
  });

  const displayedSendAmount = lastEditedAmount !== "send" ? receiveToSend : sendAmount;
  const displayedReceiveAmount = lastEditedAmount !== "receive" ? sendToReceive : receiveAmount;

  const handleSwap = () => {
    setLastEditedAmount("swap");
    setSelectedCurrencyPair({
      base: quote as CountryCode,
      quote: base as CountryCode,
    });
    setSendAmount(receiveAmount);
    setReceiveAmount(sendAmount);
  };

  const handleSendAmountChange = (amount: string) => {
    setLastEditedAmount("send");
    setSendAmount(amount);
    setReceiveAmount((parseFloat(amount) * exchangeRate).toFixed(2));
  };

  const handleReceiveAmountChange = (amount: string) => {
    setLastEditedAmount("receive");
    setReceiveAmount(amount);
    setSendAmount((parseFloat(amount) / exchangeRate).toFixed(2));
  };

  return (
    <CardWithTitle
      title="CHECK THE RATE"
      footer={
        <ConverterFooter
          exchangeRateInfo={exchangeRateInfo}
          isFavourite={isPairFavourite}
          onFavouriteToggle={() =>
            isPairFavourite
              ? removeFavourite({
                  base: base as CountryCode,
                  quote: quote as CountryCode,
                })
              : addFavourite({
                  base: base as CountryCode,
                  quote: quote as CountryCode,
                })
          }
          onLogConversion={() =>
            logConversion({
              base: base as CountryCode,
              quote: quote as CountryCode,
              baseAmount: parseFloat(sendAmount),
              quoteAmount: parseFloat(receiveAmount),
              timestamp: new Date().toISOString() as DateTimeString,
            })
          }
        />
      }>
      {/* Send */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <ConverterCurrencyField
          label="Send"
          availableCurrencies={availableCurrencies}
          selectedCurrency={base}
          amount={displayedSendAmount}
          setAmount={handleSendAmountChange}
          setSelectedCurrency={(currency) => setSelectedCurrencyBase(currency as CountryCode)}
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
          selectedCurrency={quote}
          amount={displayedReceiveAmount}
          setAmount={handleReceiveAmountChange}
          setSelectedCurrency={(currency) => setSelectedCurrencyQuote(currency as CountryCode)}
        />
      </div>
    </CardWithTitle>
  );
};

export default Converter;
