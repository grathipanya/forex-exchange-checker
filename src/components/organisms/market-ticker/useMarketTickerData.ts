import {
  useExchangeRatesByBaseAndQuote,
  useHistoricalExchangeRatesByBaseAndQuote,
} from "@/hooks/useCurrencyData";
import { formatNumberSignDisplay } from "@/utils/numberFormatter";
import { useMemo } from "react";

// pairs found in the design
const TICKER_CONFIG = [
  { base: "USD", quote: "JPY" },
  { base: "GBP", quote: "USD" },
  { base: "USD", quote: "CHF" },
  { base: "EUR", quote: "GBP" },
  { base: "AUD", quote: "USD" },
  { base: "USD", quote: "CAD" },
  { base: "EUR", quote: "JPY" },
];

const QUOTES_BY_BASE = TICKER_CONFIG.reduce<Record<string, string[]>>((groups, { base, quote }) => {
  const quotes = groups[base] ?? [];

  quotes.push(quote);
  groups[base] = quotes;

  return groups;
}, {});

const USD_QUOTES = QUOTES_BY_BASE.USD ?? [];
const GBP_QUOTES = QUOTES_BY_BASE.GBP ?? [];
const EUR_QUOTES = QUOTES_BY_BASE.EUR ?? [];
const AUD_QUOTES = QUOTES_BY_BASE.AUD ?? [];

export type ComparedRate = {
  base: string;
  quote: string;
  rate: number;
  difference: string;
};

export const useMarketTickerData = () => {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const historyDate = yesterdayDate.toDateString();

  // Latest Data
  const { latestRateData: latestUsdRateData, error: latestUsdRateError } =
    useExchangeRatesByBaseAndQuote({
      baseCurrency: "USD",
      quoteCurrency: USD_QUOTES,
    });
  const { latestRateData: latestGbpRateData, error: latestGbpRateError } =
    useExchangeRatesByBaseAndQuote({
      baseCurrency: "GBP",
      quoteCurrency: GBP_QUOTES,
    });
  const { latestRateData: latestEurRateData, error: latestEurRateError } =
    useExchangeRatesByBaseAndQuote({
      baseCurrency: "EUR",
      quoteCurrency: EUR_QUOTES,
    });
  const { latestRateData: latestAudRateData, error: latestAudRateError } =
    useExchangeRatesByBaseAndQuote({
      baseCurrency: "AUD",
      quoteCurrency: AUD_QUOTES,
    });

  // Historical Data
  const { latestHistoricalRateData: historicalUsdRateData, error: historicalUsdRateError } =
    useHistoricalExchangeRatesByBaseAndQuote({
      date: historyDate,
      base: "USD",
      quotes: USD_QUOTES,
    });
  const { latestHistoricalRateData: historicalGbpRateData, error: historicalGbpRateError } =
    useHistoricalExchangeRatesByBaseAndQuote({
      date: historyDate,
      base: "GBP",
      quotes: GBP_QUOTES,
    });
  const { latestHistoricalRateData: historicalEurRateData, error: historicalEurRateError } =
    useHistoricalExchangeRatesByBaseAndQuote({
      date: historyDate,
      base: "EUR",
      quotes: EUR_QUOTES,
    });
  const { latestHistoricalRateData: historicalAudRateData, error: historicalAudRateError } =
    useHistoricalExchangeRatesByBaseAndQuote({
      date: historyDate,
      base: "AUD",
      quotes: AUD_QUOTES,
    });

  const latestRateData = useMemo(
    () => [
      ...(latestUsdRateData ?? []),
      ...(latestGbpRateData ?? []),
      ...(latestEurRateData ?? []),
      ...(latestAudRateData ?? []),
    ],
    [latestUsdRateData, latestGbpRateData, latestEurRateData, latestAudRateData],
  );

  const yesterdayRateData = useMemo(
    () => [
      ...(historicalUsdRateData ?? []),
      ...(historicalGbpRateData ?? []),
      ...(historicalEurRateData ?? []),
      ...(historicalAudRateData ?? []),
    ],
    [historicalUsdRateData, historicalGbpRateData, historicalEurRateData, historicalAudRateData],
  );

  const latestRateError = [
    latestUsdRateError,
    latestGbpRateError,
    latestEurRateError,
    latestAudRateError,
  ]
    .filter(Boolean)
    .join(" | ");

  const historicalRateError = [
    historicalUsdRateError,
    historicalGbpRateError,
    historicalEurRateError,
    historicalAudRateError,
  ]
    .filter(Boolean)
    .join(" | ");

  const compareRates = useMemo<ComparedRate[]>(() => {
    if (!yesterdayRateData.length || !latestRateData.length) return [];

    return TICKER_CONFIG.map((pair) => {
      const latestRate = latestRateData.find(
        (rate) => rate.base === pair.base && rate.quote === pair.quote,
      );
      const prevRate = yesterdayRateData.find(
        (rate) => rate.base === pair.base && rate.quote === pair.quote,
      );

      if (!latestRate || !prevRate) return null;

      return {
        base: pair.base,
        quote: pair.quote,
        rate: latestRate.rate,
        difference: formatNumberSignDisplay(100 - (latestRate.rate / prevRate.rate) * 100),
      };
    }).filter((rate): rate is ComparedRate => rate !== null);
  }, [yesterdayRateData, latestRateData]);

  return {
    yesterdayRateData,
    historicalRateError,
    latestRateData,
    latestRateError,
    compareRates,
  };
};
