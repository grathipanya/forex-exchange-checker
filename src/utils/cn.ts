import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "preset-1",
            "preset-1-tablet",
            "preset-2",
            "preset-2-bold",
            "preset-3",
            "preset-3-medium",
            "preset-3-bold",
            "preset-4",
            "preset-5",
            "preset-5-medium",
            "preset-6",
          ],
        },
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
