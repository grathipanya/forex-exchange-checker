import { cn } from "@/utils/cn";
import { Image } from "@/components/atoms/image";
import IconSearch from "@/assets/images/icon-search.svg";

export type SearchInputProps = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  className?: string;
};

const SearchInput = ({ value, label = "Search", onChange, className }: SearchInputProps) => (
  <div
    className={cn(
      "flex items-center p-3 gap-2.5 rounded-6 border border-neutral-200 focus:outline-2 focus:outline-lime-500",
      className,
    )}>
    <>
      <Image
        src={IconSearch}
        alt="search icon"
        className="w-3.5 h-5"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="focus:outline-none text-preset-5 text-neutral-50  placeholder:text-neutral-200"
      />
    </>
  </div>
);
export default SearchInput;
