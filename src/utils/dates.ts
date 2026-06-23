import { differenceInMinutes, differenceInHours, differenceInDays, format } from "date-fns";
import type { DateTimeString } from "@/types/currency";

export const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getYesterdayDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
};

export const getDateFromNow = (date: DateTimeString): string => {
  const now = new Date();
  const d = new Date(date);

  const mins = differenceInMinutes(now, d);
  const hours = differenceInHours(now, d);
  const days = differenceInDays(now, d);

  // < 60 minutes → Xm
  if (mins < 60) return `${mins}m`;

  // < 24 hours → Xh
  if (hours < 24) return `${hours}h`;

  // < 7 days → Xd
  if (days < 7) return `${days}d`;

  // older → formatted date
  return format(d, "dd MMM");
};
