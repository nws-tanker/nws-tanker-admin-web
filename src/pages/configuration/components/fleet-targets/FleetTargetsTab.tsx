import { useEffect, useState } from 'react';
import { Button, useToast } from '@/atoms';
import { InfoIcon } from '@/atoms/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFleetTargets } from '@/store/apiSlices/fleetTargetsApiSlice';
import { saveFleetTargetsApi } from '@/services/fleetTargetsService';
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
  const { apiState, data } = useAppSelector((s) => s.fleetTargetsApi);
  const [targets, setTargets] = useState<FleetTarget[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await saveFleetTargetsApi({
        governorates: targets.map((t) => ({
          id: t.id,
          dwCount: t.dw,
          swCount: t.sw,
          teCount: t.te,
        })),
      });
      if (response.success) {
        toast.show('Fleet targets saved successfully');
      } else {
        toast.show(
          response.error?.description ?? 'Failed to save fleet targets',
          {
            tone: 'error',
          },
        );
      }
    } catch {
      toast.show('Failed to save fleet targets', { tone: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FleetTargetsKpiStrip totals={totals} />

      <div className="flex items-center gap-2.5 rounded-card border border-blue-200 bg-blue-50 px-4 py-3 text-[13px] text-blue-800">
        <InfoIcon width={16} height={16} strokeWidth={2} className="shrink-0" />
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
      />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Fleet Targets'}
        </Button>
      </div>
    </div>
  );
}
