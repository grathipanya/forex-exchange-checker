export const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getYesterdayDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
};
