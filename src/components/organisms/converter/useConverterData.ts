import {
  useAllCurrencyData,
  useExchangeRatesByBaseAndQuote,
  type UseCurrencyExchangeBaseAndQuoteDataParams,
} from "@/hooks/useCurrencyData";
import {
  useGetCurrencyPair,
  useSetCurrencyBase,
  useSetCurrencyPair,
  useSetCurrencyQuote,
} from "@/stores/useCurrencyStore";
import { useFavouriteStore, useIsFavourite } from "@/stores/useFavouriteStore";
import type { CountryCode } from "@/types/currency";
import { useMemo } from "react";

type ConverterDataProps = UseCurrencyExchangeBaseAndQuoteDataParams & {
  sendAmount?: number;
  receiveAmount?: number;
};

export const useConverterData = ({
  baseCurrency,
  quoteCurrency,
  sendAmount,
  receiveAmount,
}: ConverterDataProps) => {
  const { currencyData } = useAllCurrencyData();
  const { latestRateData: exchangeRatesData } = useExchangeRatesByBaseAndQuote({
    baseCurrency,
    quoteCurrency,
  });

  const availableCurrencies =
    currencyData?.map((currency) => ({
      iso_code: currency.iso_code,
      country_code: currency.iso_code.slice(0, -1),
      name: currency.name,
    })) ?? [];

  const exchangeRate = useMemo(() => {
    if (!exchangeRatesData || exchangeRatesData.length === 0) return 1; // Null if currencies are the same

    const rateInfo = exchangeRatesData[0];
    return rateInfo.rate;
  }, [exchangeRatesData]);

  // footer info
  const exchangeRateInfo = useMemo(() => {
    if (!exchangeRatesData || exchangeRatesData.length === 0)
      return `1 ${baseCurrency} = 1 ${quoteCurrency}`; // Null if currencies are the same

    const rateInfo = exchangeRatesData[0];

    const base = rateInfo.base;
    const quote = rateInfo.quote;
    const rate = rateInfo.rate;

    return `1 ${base} = ${rate} ${quote}`;
  }, [exchangeRatesData, baseCurrency, quoteCurrency]);

  // send/receive cards conversion amounts
  const conversionAmount = useMemo(() => {
    if (!exchangeRatesData || exchangeRatesData.length === 0)
      return {
        sendToReceive: sendAmount ?? 0,
        receiveToSend: receiveAmount ?? 0,
      }; // Same-currency fallback

    const rateInfo = exchangeRatesData[0];

    const sendToReceive = sendAmount ? (sendAmount * rateInfo.rate).toFixed(2) : "0";

    const receiveToSend = receiveAmount ? (receiveAmount / rateInfo.rate).toFixed(2) : "0";

    return { sendToReceive, receiveToSend };
  }, [exchangeRatesData, sendAmount, receiveAmount]);

  const isPairFavourite = useIsFavourite({
    base: baseCurrency as CountryCode,
    quote: quoteCurrency as CountryCode,
  });

  const addFavourite = useFavouriteStore((state) => state.addFavourite);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);

  const setSelectedCurrencyBase = useSetCurrencyBase();
  const setSelectedCurrencyQuote = useSetCurrencyQuote();
  const setSelectedCurrencyPair = useSetCurrencyPair();

  return {
    availableCurrencies,
    exchangeRatesData,
    exchangeRateInfo,
    conversionAmount,
    exchangeRate,
    isPairFavourite,
    addFavourite,
    removeFavourite,
    setSelectedCurrencyBase,
    setSelectedCurrencyQuote,
    setSelectedCurrencyPair,
  };
};
