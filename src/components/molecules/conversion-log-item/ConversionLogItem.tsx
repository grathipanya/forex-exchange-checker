import IconArrowRight from "@/assets/images/icon-arrow-right.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import { Image } from "@/components/atoms/image";
import Card from "@/components/atoms/card/card";
import { ButtonIcon } from "@/components/molecules/button-icon";
import { useEffect, useRef, useState } from "react";
import type { ConversionRecord } from "@/stores/useConversionStore";
import { getDateFromNow } from "@/utils/dates";
import { Label } from "@/components/atoms/label";

export type ConversionLogItemProps = {
  currencyPair: ConversionRecord;
  removeConversionLog: () => void;
};

const ConversionLogItem = ({
  currencyPair: { base, quote, baseAmount, quoteAmount, timestamp },
  removeConversionLog,
}: ConversionLogItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const removeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // add a timeout to let the user cancel the remove conversion log action
  const handleConversionLogClick = () => {
    if (!isRemoving) {
      setIsRemoving(true);

      removeTimeoutRef.current = setTimeout(() => {
        removeConversionLog();
        setIsRemoving(false);
      }, 3000);

      return;
    }

    if (removeTimeoutRef.current) {
      clearTimeout(removeTimeoutRef.current);
      removeTimeoutRef.current = null;
    }

    setIsRemoving(false);
  };

  useEffect(() => {
    if (!removeTimeoutRef.current) return;
    clearTimeout(removeTimeoutRef.current);
  }, []);

  return (
    <Card className="text-preset-5 flex flex-row gap-4 px-4 py-2 border border-neutral-400 bg-neutral-600 items-center justify-between">
      <div className="grid grid-cols-2">
        <Label className="text-preset-4 text-neutral-200">
          {timestamp && getDateFromNow(timestamp)}
        </Label>

        <div className="text-neutral-50 text-preset-4 flex gap-2">
          {base}
          <Image
            src={IconArrowRight}
            alt="Arrow Right"
            className="h-2.5 w-2.5 my-auto"
          />
          {quote}
        </div>
      </div>

      <div className="flex items-center flex-row gap-5">
        <div className="flex flex-row items-end gap-5 text-preset-3">
          <Label className="text-neutral-100">{baseAmount}</Label>
          <Label className="text-lime-500">{quoteAmount}</Label>
        </div>

        <ButtonIcon
          icon={IconDelete}
          iconClassName="h-4 w-4"
          onClick={handleConversionLogClick}
          className="ml-auto text-neutral-400 hover:text-neutral-200 p-2"
        />
      </div>
    </Card>
  );
};

export default ConversionLogItem;
