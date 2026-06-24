# Forex Exchange Checker

A React + Vite currency dashboard for live conversion, comparisons, favorites, and historical trend visualization.

## Features

- Real-time currency conversion
- Searchable currency picker with flags
- Market ticker for live pair snapshots
- Favorites (pinned pairs)
- Conversion log
- Historical exchange-rate line chart with range tabs: `1D`, `1W`, `1M`, `3M`, `6M`, `1Y`

## Historical Chart

The history chart is rendered with Highcharts using `@highcharts/react`.

Data source:

- `ratesApi.getHistoricalExchangeRatesByBaseAndQuoteFromDate`
- Endpoint shape: `/rates?from={date}&base={base}&quotes={quote}`

Returned data is transformed into time-series points for the line graph:

```ts
[
  [new Date(item.date).getTime(), item.rate],
  ...
]
```

The chart section also calculates and displays:

- Open
- Last
- Change
- % change

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand
- Highcharts React
- date-fns

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## API

This project uses Frankfurter endpoints via `src/services/currencyApi.ts`:

- `getExchangeRates`
- `getExchangeRatesByBase`
- `getExchangeRatesByBaseAndQuote`
- `getHistoricalExchangeRates`
- `getHistoricalExchangeRatesByBaseAndQuote`
- `getHistoricalExchangeRatesByBaseAndQuoteFromDate`
- `getCurrencies`

## Project Notes

- Historical range selection is handled in `HistoryChart` by converting the selected range to a `from` date.
- Empty/loading/error states are handled in the chart area for better UX resilience.
