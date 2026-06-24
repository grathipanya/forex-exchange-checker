import { Image } from "@/components/atoms/image";
import { getFlagImageUrl } from "@/utils/image";

export type FlagIconProps = {
  iconString: string;
  onImageStatusChange?: (isoCode: string, isLoaded: boolean) => void;
  setImageBroken?: (isBroken: boolean) => void;
};

const FlagIcon = ({ iconString, onImageStatusChange, setImageBroken }: FlagIconProps) => {
  if (!iconString) return null;
  return (
    <Image
      src={getFlagImageUrl(iconString)}
      alt={`${iconString} flag`}
      className="w-5 h-5 inline-block mr-1"
      onLoad={() => onImageStatusChange?.(iconString, true)}
      onError={() => {
        setImageBroken?.(true);
        onImageStatusChange?.(iconString, false);
      }}
    />
  );
};

export default FlagIcon;
