export type IDType = string | number;

export interface ConversionLogEntry {
  id: IDType;
  timestamp: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
}

export interface ConversionPair {
  id: IDType;
  fromCurrency: string;
  toCurrency: string;
}

export interface HistoricalChartPoint {
  date: string;
  rate: number;
}
