import type { FleetTotals } from '@/types/configuration';

type Props = {
  totals: FleetTotals;
};

export function FleetTargetsKpiStrip({ totals }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="rounded-card-lg border border-teal-200 bg-teal-900 px-4 py-3 shadow-card-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
          Grand Total
        </div>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[28px] font-bold leading-none text-white">
            {totals.total.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 text-[11.5px] text-teal-400">
          All types combined
        </div>
      </div>

      <div
        className="rounded-card-lg border border-ink-200 bg-white px-4 py-3 shadow-card-sm"
        style={{ borderLeftWidth: 3, borderLeftColor: '#3b82f6' }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          DW Target
        </div>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[28px] font-bold leading-none text-blue-600">
            {totals.dw.toLocaleString()}
          </span>
          <span className="text-[13px] text-ink-400">tankers</span>
        </div>
        <div className="mt-1 text-[11.5px] text-ink-500">Drinking Water</div>
      </div>

      <div
        className="rounded-card-lg border border-ink-200 bg-white px-4 py-3 shadow-card-sm"
        style={{ borderLeftWidth: 3, borderLeftColor: '#f59e0b' }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          SW Target
        </div>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[28px] font-bold leading-none text-amber-600">
            {totals.sw.toLocaleString()}
          </span>
          <span className="text-[13px] text-ink-400">tankers</span>
        </div>
        <div className="mt-1 text-[11.5px] text-ink-500">Sewage Water</div>
      </div>

      <div
        className="rounded-card-lg border border-ink-200 bg-white px-4 py-3 shadow-card-sm"
        style={{ borderLeftWidth: 3, borderLeftColor: '#1a8f9a' }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          TE Target
        </div>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[28px] font-bold leading-none text-teal-600">
            {totals.te.toLocaleString()}
          </span>
          <span className="text-[13px] text-ink-400">tankers</span>
        </div>
        <div className="mt-1 text-[11.5px] text-ink-500">Treated Effluent</div>
      </div>
    </div>
  );
}
