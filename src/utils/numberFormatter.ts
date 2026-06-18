export const formatNumberSignDisplay = (number: number) =>
  new Intl.NumberFormat("en-US", {
    signDisplay: "always",
    maximumFractionDigits: 4,
  }).format(number);
