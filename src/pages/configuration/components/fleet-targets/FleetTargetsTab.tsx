import { useEffect, useState } from 'react';
import { Button, useToast } from '@/atoms';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchFleetTargets,
  saveFleetTargets,
} from '@/store/apiSlices/fleetTargetsApiSlice';
import { States } from '@/store/types';
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
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { apiState, data, saveState, saveError } = useAppSelector(
    (s) => s.fleetTargetsApi,
  );
  const [targets, setTargets] = useState<FleetTarget[]>([]);

  useEffect(() => {
    dispatch(fetchFleetTargets());
  }, [dispatch]);

  useEffect(() => {
    if (apiState === States.SUCCESS && data) {
      setTargets(
        data.governorates.map((g) => ({
          id: g.id,
          gov: g.name,
          dw: g.dwCount,
          sw: g.swCount,
          te: g.teCount,
          custom: false,
        })),
      );
    }
  }, [apiState, data]);

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

  useEffect(() => {
    if (saveState === States.SUCCESS) {
      toast.show('Fleet targets saved successfully');
    } else if (saveState === States.ERROR) {
      toast.show(saveError?.description ?? 'Failed to save fleet targets', {
        tone: 'error',
      });
    }
  }, [saveState, saveError?.description, toast]);

  const handleAddRow = () => {
    setTargets((prev) => [
      ...prev,
      { id: 0, gov: 'New Governorate', dw: 0, sw: 0, te: 0, custom: true },
    ]);
  };

  const handleReset = () => {
    if (apiState === States.SUCCESS && data) {
      setTargets(
        data.governorates.map((g) => ({
          id: g.id,
          gov: g.name,
          dw: g.dwCount,
          sw: g.swCount,
          te: g.teCount,
          custom: false,
        })),
      );
    }
  };

  const handleSave = () => {
    dispatch(
      saveFleetTargets({
        governorates: targets.map((t) => ({
          id: t.id,
          dwCount: t.dw,
          swCount: t.sw,
          teCount: t.te,
        })),
      }),
    );
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
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saveState === States.LOADING}
        >
          {saveState === States.LOADING ? 'Saving…' : 'Save Fleet Targets'}
        </Button>
      </div>
    </div>
  );
}
