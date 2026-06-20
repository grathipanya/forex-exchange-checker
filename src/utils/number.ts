export const isValuePositive = (value: number | string): boolean =>
  parseFloat(value.toString()) > 0;

export const getDifferenceIcon = (value: number | string): string =>
  isValuePositive(value) ? "▲" : "▼";
