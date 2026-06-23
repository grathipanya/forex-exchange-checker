import { Button } from "@/components/atoms/button";
import { CardWithTitle } from "@/components/molecules/card-with-title";
import { ConversionLogItem } from "@/components/molecules/conversion-log-item";
import {
  useGetConversionLogs,
  useConversionStore,
  useGetNumberOfConversionLogs,
} from "@/stores/useConversionStore";

const ConversionLog = () => {
  const conversionLogs = useGetConversionLogs();

  const removeConversion = useConversionStore((state) => state.removeConversion);

  return (
    <div>
      <CardWithTitle
        title="Conversion Log"
        titleLocation="inside"
        info={String(useGetNumberOfConversionLogs() + " Logged")}
        actions={
          <Button
            text="Clear All"
            className="bg-neutral-600 text-neutral-200 py-2 px-3"
            onClick={() => conversionLogs.forEach((pair) => removeConversion(pair))}
          />
        }
        className="gap-3">
        {conversionLogs &&
          conversionLogs.map(({ base, quote, baseAmount, quoteAmount, timestamp }, index) => (
            <ConversionLogItem
              key={index}
              currencyPair={{ base, quote, baseAmount, quoteAmount, timestamp }}
              removeConversionLog={() =>
                removeConversion({ base, quote, baseAmount, quoteAmount, timestamp })
              }
            />
          ))}
      </CardWithTitle>
    </div>
  );
};

export default ConversionLog;
