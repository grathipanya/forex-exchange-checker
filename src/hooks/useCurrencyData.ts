import { currenciesApi, ratesApi } from "@/services/currencyApi";
import type { Currency, DateTimeString, Rate } from "@/types/currency";
import { formatDateToYYYYMMDD } from "@/utils/dates";
import { useEffect, useState } from "react";

// Fetch the latest exchange rates.
export const useLatestExchangeRateData = () => {
  const [latestRateData, setLatestRateData] = useState<Rate[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await ratesApi.getExchangeRates();
        setLatestRateData(response);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchRateData();
  }, []);

  return { latestRateData, error };
};

export const useHistoricalExchangeRateData = (date: DateTimeString) => {
  const [latestHistoricalRateData, setLatestHistoricalRateData] = useState<Rate[] | null>(null);
  const [error, setError] = useState<string>("");

  const formattedDate = formatDateToYYYYMMDD(new Date(date));

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await ratesApi.getHistoricalExchangeRates(formattedDate);
        setLatestHistoricalRateData(response);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchRateData();
  }, [formattedDate]);

  return { latestHistoricalRateData, error };
};

// Change the base currency with base.
export const useCurrencyExchangeBaseData = ({ baseCurrency }: { baseCurrency: string }) => {
  const [latestRateData, setLatestRateData] = useState<Rate[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await ratesApi.getExchangeRatesByBase(baseCurrency);
        setLatestRateData(response);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchRateData();
  }, [baseCurrency]);

  return { latestRateData, error };
};

// Change the base currency with base.
export const useExchangeRatesByBaseAndQuote = ({
  baseCurrency,
  quoteCurrency,
}: {
  baseCurrency: string;
  quoteCurrency: string[];
}) => {
  const [latestRateData, setLatestRateData] = useState<Rate[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await ratesApi.getExchangeRatesByBaseAndQuote({
          base: baseCurrency,
          quotes: quoteCurrency,
        });
        setLatestRateData(response);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchRateData();
  }, [baseCurrency, quoteCurrency]);

  return { latestRateData, error };
};

export const useHistoricalExchangeRatesByBaseAndQuote = ({
  date,
  base,
  quotes,
}: {
  date: DateTimeString;
  base: string;
  quotes: string[];
}) => {
  const [latestHistoricalRateData, setLatestHistoricalRateData] = useState<Rate[] | null>(null);
  const [error, setError] = useState<string>("");

  const formattedDate = formatDateToYYYYMMDD(new Date(date));

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await ratesApi.getHistoricalExchangeRatesByBaseAndQuote({
          date: formattedDate,
          base,
          quotes,
        });
        setLatestHistoricalRateData(response);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchRateData();
  }, [formattedDate, base, quotes]);

  return { latestHistoricalRateData, error };
};

export const useAllCurrencyData = () => {
  const [currencyData, setCurrencyData] = useState<Currency[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchCurrencyData() {
      try {
        const response = await currenciesApi.getCurrencies();
        setCurrencyData(response);
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchCurrencyData();
  }, []);

  return { currencyData, error };
};
