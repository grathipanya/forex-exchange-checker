export type IDType = string | number;
export type ProviderKey = string;
export type CountryCode = string;

export type DateTimeString = string | Date;

export interface Rate {
  date: DateTimeString;
  base: CountryCode;
  quote: CountryCode;
  rate: number;
}

export interface Currency {
  iso_code: CountryCode;
  iso_numeric?: string | null;
  name: string;
  symbol?: string | null;
  start_date?: DateTimeString | null;
  end_date?: DateTimeString | null;
}

export interface Provider {
  key: ProviderKey;
  name: string;
  base: CountryCode;
  start_date?: DateTimeString | null;
  end_date?: DateTimeString | null;
  currencies: CountryCode[];
}

export interface ErrorResponseBody {
  message?: string;
  [key: string]: unknown;
}

export type Listable<T> = T | readonly T[];
