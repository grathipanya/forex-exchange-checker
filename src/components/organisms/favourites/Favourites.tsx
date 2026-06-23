import { CardWithTitle } from "@/components/molecules/card-with-title";
import { PinnedPairItem } from "@/components/molecules/pinned-pair-item";
import {
  useNumberOfFavourites,
  useFavouritePairs,
  useFavouriteStore,
} from "@/stores/useFavouriteStore";

const Favourites = () => {
  const favouritePairs = useFavouritePairs();

  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);

  return (
    <div>
      <CardWithTitle
        title="Pinned Pairs"
        titleLocation="inside"
        info={String(useNumberOfFavourites() + " favourites")}
        className="gap-3">
        {favouritePairs &&
          favouritePairs.map((pair, index) => (
            <PinnedPairItem
              key={index}
              currencyPair={pair}
              removeFavourite={() => removeFavourite(pair)}
            />
          ))}
      </CardWithTitle>
    </div>
  );
};

export default Favourites;
