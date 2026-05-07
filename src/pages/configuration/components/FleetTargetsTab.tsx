import { useState } from 'react';
import { Button } from '@/atoms';
import { DEFAULT_FLEET_TARGETS } from '@/constants/configuration';
import type { FleetTarget, FleetTotals } from '@/types/configuration';
import { FleetTargetsKpiStrip } from './FleetTargetsKpiStrip';
import { FleetTargetsTable } from './FleetTargetsTable';

function computeTotals(targets: FleetTarget[]): FleetTotals {
  const dw = targets.reduce((s, r) => s + r.dw, 0);
  const sw = targets.reduce((s, r) => s + r.sw, 0);
  const te = targets.reduce((s, r) => s + r.te, 0);
  return { dw, sw, te, total: dw + sw + te };
}

export function FleetTargetsTab() {
  const [targets, setTargets] = useState<FleetTarget[]>(() =>
    DEFAULT_FLEET_TARGETS.map((r) => ({ ...r })),
  );

  const totals = computeTotals(targets);

  const handleUpdate = (
    index: number,
    field: 'dw' | 'sw' | 'te' | 'gov',
    value: number | string,
  ) => {
    setTargets((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)),
    );
  };

  const handleDelete = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddRow = () => {
    setTargets((prev) => [
      ...prev,
      { gov: 'New Governorate', dw: 0, sw: 0, te: 0, custom: true },
    ]);
  };

  const handleReset = () => {
    setTargets(DEFAULT_FLEET_TARGETS.map((r) => ({ ...r })));
  };

  return (
    <div className="flex flex-col gap-4">
      <FleetTargetsKpiStrip totals={totals} />

      <div className="flex items-center gap-2.5 rounded-card border border-blue-200 bg-blue-50 px-4 py-3 text-[13px] text-blue-800">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="8" />
          <line x1="12" y1="12" x2="12" y2="16" />
        </svg>
        <span>
          Planning benchmarks only — not actual tanker records. Used as
          denominators for compliance rate on the Operations Dashboard,
          Leadership Dashboard and Fleet Compliance screen.
        </span>
      </div>

      <FleetTargetsTable
        targets={targets}
        totals={totals}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onAddRow={handleAddRow}
      />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button variant="primary">Save Fleet Targets</Button>
      </div>
    </div>
  );
}
