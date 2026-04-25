import { useMemo } from 'react';
import { Select, type SelectOption } from '@/atoms';
import type { Inspector } from '@/types';

type Props = {
  value: string;
  onChange: (next: string) => void;
  inspectors: Inspector[];
};

export function InspectorField({ value, onChange, inspectors }: Props) {
  const options = useMemo<SelectOption[]>(
    () =>
      inspectors.map((i) => ({ value: i.id, label: `${i.name} (${i.id})` })),
    [inspectors],
  );

  return (
    <div className="grid gap-1.5">
      <label className="text-[12px] font-medium text-ink-700">
        Inspector <span className="text-red-500">*</span>
      </label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder="— Select inspector —"
      />
    </div>
  );
}
