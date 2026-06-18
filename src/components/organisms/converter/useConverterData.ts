import { useAllCurrencyData } from "@/hooks/useCurrencyData";

export const useConverterData = () => {
  const { currencyData, error } = useAllCurrencyData();

  const availableCurrencies =
    currencyData?.map((currency) => ({
      iso_code: currency.iso_code,
      country_code: currency.iso_code.slice(0, -1),
      name: currency.name,
    })) ?? [];

  return {
    availableCurrencies,
  };
};
