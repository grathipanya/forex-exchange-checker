export type SelectProps = {
  options: {
    value: string;
    label: string;
    country_code: string;
    name: string;
    dropdownLabel?: React.ReactNode | string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

const Select = ({ options, value, onChange }: SelectProps) => {
  console.log(value, options);
  return (
    <div></div>
  );
};

export default Select;
