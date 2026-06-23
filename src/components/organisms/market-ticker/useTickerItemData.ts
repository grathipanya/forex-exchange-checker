import { useMemo } from "react";
import {
  useExchangeRatesByBaseAndQuote,
  useHistoricalExchangeRatesByBaseAndQuote,
} from "@/hooks/useCurrencyData";
import { getYesterdayDateString } from "@/utils/dates";

interface UseTickerItemDataProps {
  base: string;
  quote: string;
}

export const useTickerItemData = ({ base, quote }: UseTickerItemDataProps) => {
  const quotesArray = useMemo(() => [quote], [quote]);

  const { latestRateData, error: latestError } = useExchangeRatesByBaseAndQuote({
    baseCurrency: base,
    quoteCurrency: quotesArray,
  });

  const { latestHistoricalRateData: yesterdayData, error: historicalError } =
    useHistoricalExchangeRatesByBaseAndQuote({
      date: getYesterdayDateString(),
      base: base,
      quotes: quotesArray,
    });

  //  Calculate the percentage difference once both payloads load successfully
  const processedPair = useMemo(() => {
    if (!latestRateData || !yesterdayData) return null;

    const latestItem = latestRateData[0] ? latestRateData[0] : { base, quote, rate: 0 };
    const yesterdayItem = yesterdayData[0] ? yesterdayData[0] : { base, quote, rate: 0 };

    return {
      base,
      quote,
      rate: latestItem.rate,
      difference: Number((100 - (latestItem.rate / yesterdayItem.rate) * 100).toFixed(2)),
    };
  }, [latestRateData, yesterdayData, base, quote]);

  return {
    processedPair,
    error: latestError || historicalError,
  };
};
