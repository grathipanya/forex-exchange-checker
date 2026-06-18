import type { Rate } from "@/types/currency";

const DEFAULT_BASE_URL = "https://api.frankfurter.dev/v2/";

export const currencyApi = {
  async getExchangeRates(): Promise<Rate[]> {
    const response = await fetch(`${DEFAULT_BASE_URL}rates`);
    return response.json();
  },
  async getExchangeRatesByBase(base: string): Promise<Rate[]> {
    const response = await fetch(`${DEFAULT_BASE_URL}rates?base=${base}`);
    return response.json();
  },
  async getExchangeRatesByBaseAndQuote({
    base,
    quotes,
  }: {
    base: string;
    quotes: string[];
  }): Promise<Rate[]> {
    const response = await fetch(
      `${DEFAULT_BASE_URL}rates?base=${base}&quotes=${quotes.join(",")}`,
    );
    return response.json();
  },
  async getHistoricalExchangeRates(date: string): Promise<Rate[]> {
    const response = await fetch(`${DEFAULT_BASE_URL}rates?date=${date}`);
    return response.json();
  },
  async getHistoricalExchangeRatesByBaseAndQuote({
    date,
    base,
    quotes,
  }: {
    date: string;
    base: string;
    quotes: string[];
  }): Promise<Rate[]> {
    const response = await fetch(
      `${DEFAULT_BASE_URL}rates?date=${date}&base=${base}&quotes=${quotes.join(",")}`,
    );
    return response.json();
  },
};
