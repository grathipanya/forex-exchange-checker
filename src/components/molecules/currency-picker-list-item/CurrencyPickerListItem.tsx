export type CurrencyPickerListItemProps = {
  currency: { iso_code: string; name: string };
  onClick: (currency: { iso_code: string; name: string }) => void;
};

const CurrencyPickerListItem = ({ currency, onClick }: CurrencyPickerListItemProps) => (
  <button
    className="w-full text-left px-3 py-2 rounded-6 hover:bg-neutral-100"
    onClick={() => onClick(currency)}>
    {currency.iso_code} - {currency.name}
  </button>
);

export default CurrencyPickerListItem;
