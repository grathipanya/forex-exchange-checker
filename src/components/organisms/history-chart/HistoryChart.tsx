// DATA hook to retrieve
// cards data
// range picker
// graph data

import { Card } from "@/components/atoms/card";
import { Label } from "@/components/atoms/label/";

export type CardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode | string;
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
  },
  {
    title: "Last",
    value: "▲ +0.16%",
    icon: "💱",
  },
];

const HARDCODED_RANGE_OPTIONS = ["1D", "1W", "1M", "3M", "6M", "1Y"];

const HistoryChart = () => (
  <>
    <div className="flex flex-row gap-4 mt-5">
      {HARDCDODED_CARDS_DATA.map((card) => (
        <Card
          key={card.title}
          className="flex flex-col bg-neutral-700 border-1 border-neuytral-600 gap-4 py-3 px-5 flex-1 min-w-0"
        >
          <Label className="text-preset-4 text-neutral-50">{card.title}</Label>
          <Label className="text-preset-2 text-neutral-50">{card.value}</Label>
        </Card>
      ))}
    </div>
    <div>
      {HARDCODED_RANGE_OPTIONS.map((option) => (
        <Card key={option}>
          <Label>{option}</Label>
        </Card>
      ))}
    </div>
  </>
);

export default HistoryChart;
