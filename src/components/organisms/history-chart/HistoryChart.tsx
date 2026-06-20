// DATA hook to retrieve
// cards data
// range picker
// graph data

import { Card } from "@/components/atoms/card";
import { Label } from "@/components/atoms/label/";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { cn } from "@/utils/cn";
import { getDifferenceIcon, isValuePositive } from "@/utils/number";
import { format } from "date-fns/format";
import { useState } from "react";

export type CardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode | string;
  showSymbol?: boolean;
  colored?: boolean;
}[];

export type RangePickerProps = {
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
};

export type GraphDataPoint = {
  date: string;
  value: number;
};

export type GraphData = {
  currencyPair: { base: string; quote: string };
  currentDateTime: string;
  exchangeRate: number;
  data: GraphDataPoint[];
};

const HARDCDODED_CARDS_DATA: CardProps = [
  {
    title: "Open",
    value: "1.2345",
  },
  {
    title: "Last",
    value: "1.2345",
    icon: "💱",
  },
  {
    title: "Change",
    value: "+1.2345",
    icon: "💱",
    colored: true,
  },
  {
    title: "% change",
    value: "+0.16%",
    icon: "💱",
    colored: true,
    showSymbol: true,
  },
];

const HARDCODED_RANGE_OPTIONS = ["1D", "1W", "1M", "3M", "6M", "1Y"];

const HARDCODED_GRAPH_DATA: GraphData = {
  currencyPair: { base: "USD", quote: "EUR" },
  currentDateTime: "2024-06-01T12:00:00Z",
  exchangeRate: 1.2345,
  data: [
    { date: "2024-05-01", value: 1.2 },
    { date: "2024-05-08", value: 1.21 },
    { date: "2024-05-15", value: 1.22 },
    { date: "2024-05-22", value: 1.23 },
    { date: "2024-05-29", value: 1.2345 },
  ],
};

const HistoryChart = () => {
  const [selectedRange, setSelectedRange] = useState("1M");

  const formatGraphInfoHeader = ({ exchangeRate }: GraphData) => {
    const date = new Date().toLocaleString("en-US", { timeZoneName: "short" });

    const formattedDate = format(date, "MMM dd HH:mm z").toUpperCase();
    const trimmedDate = formattedDate.slice(0, formattedDate.indexOf("+"));

    return `${exchangeRate} · ${trimmedDate}`;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center pt-5">
        <div className="grid grid-cols-4 gap-4">
          {HARDCDODED_CARDS_DATA.map((card) => (
            <CardWithTitle key={card.title} titleLocation="inside" {...card}>
              <Label
                className={cn(
                  "text-preset-2 text-neutral-50",
                  card.colored &&
                    (isValuePositive(card.value)
                      ? "text-green-500"
                      : "text-red-500"),
                )}
              >
                {card.showSymbol && getDifferenceIcon(card.value)} {card.value}
              </Label>
            </CardWithTitle>
          ))}
        </div>
        <div className="flex flex-row bg-neutral-700 rounded-8 py-0.5 w-max h-fit">
          {HARDCODED_RANGE_OPTIONS.map((option) => (
            <Card
              key={option}
              className={cn(
                "px-4 py-3 text-preset-5 hover:cursor-pointer",
                selectedRange === option
                  ? "bg-neutral-500 text-neutral-50"
                  : "bg-transparent text-neutral-200",
              )}
              onClick={() => setSelectedRange(option)}
            >
              <Label>{option}</Label>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <CardWithTitle
          titleLocation="inside"
          title={
            HARDCODED_GRAPH_DATA.currencyPair.base +
            "/" +
            HARDCODED_GRAPH_DATA.currencyPair.quote
          }
          titleClassName="text-preset-3-medium text-neutral-50"
          info={formatGraphInfoHeader(HARDCODED_GRAPH_DATA)}
          infoClassName="text-preset-5 text-neutral-50"
        >
          big boy graph here
        </CardWithTitle>
      </div>
    </div>
  );
};

export default HistoryChart;
