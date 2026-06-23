import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CurrencyPair } from "./useCurrencyStore";
import type { DateTimeString } from "@/types/currency";

export type ConversionRecord = CurrencyPair & {
  baseAmount: number;
  quoteAmount: number;
  timestamp: DateTimeString;
};

export type ConversionStore = {
  currencyPairs: ConversionRecord[];
  addConversion: (record: ConversionRecord) => void;
  removeConversion: (record: ConversionRecord) => void;
};

export const useConversionStore = create<ConversionStore>()(
  persist(
    (set) => ({
      currencyPairs: [],
      addConversion: (record) =>
        set((state) => ({
          currencyPairs: [...state.currencyPairs, record],
        })),
      removeConversion: (record) =>
        set((state) => ({
          currencyPairs: state.currencyPairs.filter(
            (r) =>
              r !== record &&
              !(
                r.base === record.base &&
                r.quote === record.quote &&
                r.baseAmount === record.baseAmount &&
                r.quoteAmount === record.quoteAmount &&
                r.timestamp === record.timestamp
              ),
          ),
        })),
    }),
    {
      name: "conversion-log",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useGetNumberOfConversionLogs = () => {
  return useConversionStore((state) => state.currencyPairs.length);
};

export const useGetConversionLogs = () => {
  return useConversionStore((state) =>
    state.currencyPairs.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    ),
  );
};
