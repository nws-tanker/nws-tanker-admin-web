import { useMemo } from 'react';
import { Select, type SelectOption } from '@/atoms';
import type { SampleCollector } from '@/types';

type Props = {
  value: string;
  onChange: (next: string) => void;
  samplers: SampleCollector[];
};

export function SamplerField({ value, onChange, samplers }: Props) {
  const options = useMemo<SelectOption[]>(
    () => samplers.map((s) => ({ value: s.id, label: `${s.name} (${s.id})` })),
    [samplers],
  );

  return (
    <div className="grid gap-1.5">
      <label className="text-[12px] font-medium text-ink-700">
        Sample Collector{' '}
        <span className="font-normal text-ink-400">(optional — DW only)</span>
      </label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder="— None —"
      />
    </div>
  );
}
