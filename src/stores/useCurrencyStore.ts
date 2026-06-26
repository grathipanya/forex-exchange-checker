import { create } from "zustand";
import type { CountryCode } from "@/types/currency";
import { createJSONStorage, persist } from "zustand/middleware";

export type CurrencyPair = {
  base: CountryCode;
  quote: CountryCode;
};

export type CurrencyStore = {
  selectedCurrencyPair: CurrencyPair;
  setSelectedCurrencyPair: (pair: CurrencyPair) => void;
  setSelectedCurrencyBase: (base: CountryCode) => void;
  setSelectedCurrencyQuote: (quote: CountryCode) => void;
};

const DEFAULT_CURRENCY_PAIR: CurrencyPair = {
  base: "AED",
  quote: "AED",
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      selectedCurrencyPair: DEFAULT_CURRENCY_PAIR,
      setSelectedCurrencyPair: (pair) => set({ selectedCurrencyPair: pair }),
      setSelectedCurrencyBase: (base) =>
        set((state) => ({
          selectedCurrencyPair: {
            ...(state.selectedCurrencyPair ?? DEFAULT_CURRENCY_PAIR),
            base,
          },
        })),
      setSelectedCurrencyQuote: (quote) =>
        set((state) => ({
          selectedCurrencyPair: {
            ...(state.selectedCurrencyPair ?? DEFAULT_CURRENCY_PAIR),
            quote,
          },
        })),
    }),
    {
      name: "selected-currency",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useGetCurrencyPair = () => {
  return useCurrencyStore((state) => state.selectedCurrencyPair);
};

export const useSetCurrencyPair = () => {
  const setSelectedCurrencyPair = useCurrencyStore((state) => state.setSelectedCurrencyPair);
  return setSelectedCurrencyPair;
};

export const useSetCurrencyBase = () => {
  const setSelectedCurrencyBase = useCurrencyStore((state) => state.setSelectedCurrencyBase);
  return setSelectedCurrencyBase;
};

export const useSetCurrencyQuote = () => {
  const setSelectedCurrencyQuote = useCurrencyStore((state) => state.setSelectedCurrencyQuote);
  return setSelectedCurrencyQuote;
};
