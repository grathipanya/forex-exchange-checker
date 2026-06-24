import { CardWithTitle } from "@/components/molecules/card-with-title";
import ComparisonItem from "@/components/molecules/comparison-item/ComparisonItem";
import { useGetCurrencyPair } from "@/stores/useCurrencyStore";
import { useFavouriteStore } from "@/stores/useFavouriteStore";
import type { CountryCode } from "@/types/currency";

const COMPARISON_QUOTES = ["GBP", "JPY", "CHF", "CAD", "AUD", "INR", "CNY", "BDT"] as CountryCode[];

const Comparison = () => {
  const { base } = useGetCurrencyPair() || { base: "AED", quote: "AED" };
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);
  const addFavourite = useFavouriteStore((state) => state.addFavourite);

  return (
    <div>
      <CardWithTitle
        subHeader="Multi-currency"
        title={`1,000 from ${base}`}
        titleLocation="inside"
        info={String(COMPARISON_QUOTES.length) + " Pairs"}
        actions={null}
        className="gap-3">
        {COMPARISON_QUOTES.map((quote) => {
          console.log({ base, quote });
          return (
            <ComparisonItem
              key={quote}
              currencyPair={{ base, quote }}
              removeFavourite={() => removeFavourite({ base, quote })}
              addFavourite={() => addFavourite({ base, quote })}
            />
          );
        })}
      </CardWithTitle>
    </div>
  );
};

export default Comparison;
