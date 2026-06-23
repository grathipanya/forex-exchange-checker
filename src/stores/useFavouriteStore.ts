import { create } from "zustand";
import type { CountryCode } from "@/types/currency";
import { createJSONStorage, persist } from "zustand/middleware";

export type CurrencyPair = {
  base: CountryCode;
  quote: CountryCode;
};

export type FavouriteStore = {
  favourites: CurrencyPair[];
  addFavourite: (pair: CurrencyPair) => void;
  removeFavourite: (pair: CurrencyPair) => void;
  isFavourite: (pair: CurrencyPair) => boolean;
};

export const useFavouriteStore = create<FavouriteStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      addFavourite: (pair) =>
        set((state) => ({
          favourites: [...state.favourites, pair],
        })),
      removeFavourite: (pair) =>
        set((state) => ({
          favourites: state.favourites.filter(
            (fav) => !(fav.base === pair.base && fav.quote === pair.quote),
          ),
        })),
      isFavourite: (pair) =>
        get().favourites.some((fav) => fav.base === pair.base && fav.quote === pair.quote),
    }),
    {
      name: "favourite-pairs",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useIsFavourite = (pair: CurrencyPair): boolean => {
  return useFavouriteStore((state) =>
    state.favourites.some((fav) => fav.base === pair.base && fav.quote === pair.quote),
  );
};

export const useNumberOfFavourites = () => {
  return useFavouriteStore((state) => state.favourites.length);
};

export const useFavouritePairs = () => {
  return useFavouriteStore((state) => state.favourites);
};
