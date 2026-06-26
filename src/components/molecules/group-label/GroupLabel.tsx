import { Label, type LabelProps } from "@components/atoms/label/";

export type GroupLabelProps = {
  text: LabelProps["text"][];
};

const GroupLabel = ({ text }: GroupLabelProps) => {
  if (!text) return null;

  return (
    <div className="flex flex-row gap-1 min-w-fit text-preset-4 text-neutral-200 items-center">
      {text.map((label, index) => (
        <div key={index}>
          <Label key={index}>{label}</Label>
          {index < text.length - 1 && <Label key={`separator-${index}`}>·</Label>}
        </div>
      ))}
    </div>
  );
};

export default GroupLabel;
