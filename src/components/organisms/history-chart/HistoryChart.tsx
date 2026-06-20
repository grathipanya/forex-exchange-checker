// DATA hook to retrieve
// cards data
// range picker
// graph data

import { Card } from "@/components/atoms/card";
import { Label } from "@/components/atoms/label/";
import { cn } from "@/utils/cn";
import { getDifferenceIcon, isValuePositive } from "@/utils/number";
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

const HistoryChart = () => {
  const [selectedRange, setSelectedRange] = useState("1M");
  return (
    <div className="flex justify-between items-center pt-5">
      <div className="grid grid-cols-4 gap-4">
        {HARDCDODED_CARDS_DATA.map((card) => (
          <Card
            key={card.title}
            className="flex flex-col bg-neutral-700 border border-neuytral-600 gap-4 py-3 px-5 flex-1 min-w-0"
          >
            <Label className="text-preset-4 text-neutral-50">
              {card.title}
            </Label>
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
          </Card>
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
  );
};

export default HistoryChart;
