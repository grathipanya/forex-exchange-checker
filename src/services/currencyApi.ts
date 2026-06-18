const baseHost = "https://api.frankfurter.dev/v2/";

export const currencyApi = {
  async getLatestRates(countryCode: string) {
    const response = await fetch(`${baseHost}rates?base=${countryCode}`);
    return response.json();
  },
};
