// DATA hook to retrieve
// cards data
// range picker
// graph data

import { Card } from "@/components/atoms/card";
import { Label } from "@/components/atoms/label/";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { ratesApi } from "@/services/currencyApi";
import { useGetCurrencyPair } from "@/stores/useCurrencyStore";
import type { Rate } from "@/types/currency";
import { cn } from "@/utils/cn";
import { formatDateToYYYYMMDD } from "@/utils/dates";
import { getDifferenceIcon, isValuePositive } from "@/utils/number";
import { Chart, type ChartOptions } from "@highcharts/react";
import { LineSeries } from "@highcharts/react/series/Line";
import { format } from "date-fns/format";
import { useEffect, useMemo, useState } from "react";
import { useTickerItemData } from "../market-ticker/useTickerItemData";

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

const HARDCODED_RANGE_OPTIONS = ["1D", "1W", "1M", "3M", "6M", "1Y"];

const getFromDateByRange = (range: string): string => {
  const date = new Date();

  switch (range) {
    case "1D":
      date.setDate(date.getDate() - 1);
      break;
    case "1W":
      date.setDate(date.getDate() - 7);
      break;
    case "3M":
      date.setMonth(date.getMonth() - 3);
      break;
    case "6M":
      date.setMonth(date.getMonth() - 6);
      break;
    case "1Y":
      date.setFullYear(date.getFullYear() - 1);
      break;
    case "1M":
    default:
      date.setMonth(date.getMonth() - 1);
      break;
  }

  return formatDateToYYYYMMDD(date);
};

const HistoryChart = () => {
  const { base, quote } = useGetCurrencyPair() || { base: "AED", quote: "AED" };
  const { processedPair } = useTickerItemData({ base, quote });
  const quotesArray = useMemo(() => [quote], [quote]);

  const [selectedRange, setSelectedRange] = useState("1M");
  const [historicalData, setHistoricalData] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatGraphInfoHeader = (exchangeRate: number) => {
    const formattedDate = format(new Date(), "MMM dd HH:mm").toUpperCase();

    return `${exchangeRate.toFixed(5)} · ${formattedDate}`;
  };

  const chartSeriesData = useMemo(
    () =>
      historicalData.map((item) => {
        return [new Date(item.date).getTime(), item.rate] as [number, number];
      }),
    [historicalData],
  );

  const chartOptions = useMemo<ChartOptions>(
    () => ({
      chart: {
        backgroundColor: "transparent",
        spacing: [8, 12, 8, 8],
      },
      title: {
        text: undefined,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        labels: {
          style: {
            color: "#a3a3a3",
          },
        },
      },
      yAxis: {
        title: {
          text: undefined,
        },
        labels: {
          style: {
            color: "#a3a3a3",
          },
        },
        gridLineColor: "#404040",
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        xDateFormat: "%Y-%m-%d",
        valueDecimals: 5,
      },
      plotOptions: {
        series: {
          animation: false,
          marker: {
            enabled: false,
          },
        },
      },
    }),
    [],
  );

  const cardsData = useMemo<CardProps>(() => {
    if (!historicalData.length) {
      return [
        { title: "Open", value: "-" },
        { title: "Last", value: "-" },
        { title: "Change", value: "-", colored: true },
        { title: "% change", value: "-", colored: true, showSymbol: true },
      ];
    }

    const open = historicalData[0].rate;
    const last = historicalData[historicalData.length - 1].rate;
    const change = last - open;
    const changePercent = open === 0 ? 0 : (change / open) * 100;

    return [
      {
        title: "Open",
        value: open.toFixed(5),
      },
      {
        title: "Last",
        value: last.toFixed(5),
      },
      {
        title: "Change",
        value: `${change >= 0 ? "+" : ""}${change.toFixed(5)}`,
        colored: true,
      },
      {
        title: "% change",
        value: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
        colored: true,
        showSymbol: true,
      },
    ];
  }, [historicalData]);

  const headerRate = historicalData.length
    ? historicalData[historicalData.length - 1].rate
    : processedPair?.rate || 0;

  useEffect(() => {
    if (!base || !quote || !selectedRange) return;

    async function fetchHistoricalData() {
      try {
        setLoading(true);
        setError("");

        const response = await ratesApi.getHistoricalExchangeRatesByBaseAndQuoteFromDate({
          date: getFromDateByRange(selectedRange),
          base,
          quotes: quotesArray,
        });

        const sortedData = [...response].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        setHistoricalData(sortedData);
      } catch (err) {
        setError(`Failed to fetch historical chart data: ${err}`);
        setHistoricalData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHistoricalData();
  }, [quote, base, quotesArray, selectedRange]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
          {cardsData.map((card) => (
            <CardWithTitle
              key={card.title}
              titleLocation="inside"
              {...card}>
              <Label
                className={cn(
                  "text-preset-2 text-neutral-50",
                  card.colored &&
                    card.value !== "-" &&
                    (isValuePositive(card.value) ? "text-green-500" : "text-red-500"),
                )}>
                {card.showSymbol && card.value !== "-" && getDifferenceIcon(card.value)}{" "}
                {card.value}
              </Label>
            </CardWithTitle>
          ))}
        </div>
        <div className="flex flex-row bg-neutral-700 rounded-8 py-0.5 w-max h-fit self-start lg:self-auto">
          {HARDCODED_RANGE_OPTIONS.map((option) => (
            <Card
              key={option}
              className={cn(
                "px-4 py-3 text-preset-5 hover:cursor-pointer",
                selectedRange === option
                  ? "bg-neutral-500 text-neutral-50"
                  : "bg-transparent text-neutral-200",
              )}
              onClick={() => setSelectedRange(option)}>
              <Label>{option}</Label>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <CardWithTitle
          titleLocation="inside"
          title={`${base}/${quote}`}
          titleClassName="text-preset-3-medium text-neutral-50"
          info={formatGraphInfoHeader(headerRate)}>
          {loading && <Label className="text-neutral-200">Loading chart data...</Label>}
          {!loading && error && <Label className="text-red-400">{error}</Label>}
          {!loading && !error && !chartSeriesData.length && (
            <Label className="text-neutral-200">No historical data available.</Label>
          )}
          {!loading && !error && chartSeriesData.length > 0 && (
            <Chart
              options={chartOptions}
              containerProps={{
                className: "w-full",
                style: { height: "320px" },
              }}>
              <LineSeries
                name={`${base}/${quote}`}
                data={chartSeriesData}
                color="#0ea5e9"
                options={{
                  lineWidth: 2.5,
                }}
              />
            </Chart>
          )}
        </CardWithTitle>
      </div>
    </div>
  );
};

export default HistoryChart;
