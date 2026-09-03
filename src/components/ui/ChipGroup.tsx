import * as React from 'react';

interface ChipOption {
  id: string;
  label: string;
}

interface ChipGroupProps {
  name: string;
  legend: string;
  options: ChipOption[];
  value: string;
  onChange: (id: string) => void;
}

const ChipGroup: React.FC<ChipGroupProps> = ({
  name,
  legend,
  options,
  value,
  onChange,
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-sans text-sm text-paper">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = option.id === value;
          return (
            <label
              key={option.id}
              className={`cursor-pointer rounded-full border px-4 py-2 font-sans text-sm transition-colors focus-within:ring-2 focus-within:ring-marquee focus-within:ring-offset-2 focus-within:ring-offset-ink ${
                checked
                  ? 'border-marquee bg-marquee text-ink'
                  : 'border-slate/40 bg-transparent text-paper hover:border-marquee/60'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={checked}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export { ChipGroup };
