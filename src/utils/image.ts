

export const getFlagImageUrl = (countryCode: string) => {
  return new URL(`/src/assets/images/flags/${countryCode.toLowerCase()}.webp`, import.meta.url)
    .href;
};
