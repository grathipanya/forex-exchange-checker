import { currencyApi } from "@/services/currencyApi";
import type { DateTimeString, Rate } from "@/types/currency";
import { formatDateToYYYYMMDD } from "@/utils/dates";
import { useEffect, useState } from "react";

// Fetch the latest exchange rates.
export const useLatestExchangeRateData = () => {
  const [latestRateData, setLatestRateData] = useState<Rate[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await currencyApi.getExchangeRates();
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
        const response = await currencyApi.getHistoricalExchangeRates(formattedDate);
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
        const response = await currencyApi.getExchangeRatesByBase(baseCurrency);
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
        const response = await currencyApi.getExchangeRatesByBaseAndQuote({
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
        const response = await currencyApi.getHistoricalExchangeRatesByBaseAndQuote({
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
