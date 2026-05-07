import {
  CLUSTER_IDS,
  CLUSTER_META,
  GOVERNORATES,
} from '@/constants/configuration';
import type { ClusterId } from '@/types/configuration';

type Props = {
  govAssignments: Record<string, ClusterId>;
};

export function ClusterKpiStrip({ govAssignments }: Props) {
  const totalFleet = GOVERNORATES.reduce((s, g) => s + g.fleet, 0);

  const govCountFor = (c: ClusterId) =>
    GOVERNORATES.filter((g) => govAssignments[g.name] === c).length;

  const fleetFor = (c: ClusterId) =>
    GOVERNORATES.filter((g) => govAssignments[g.name] === c).reduce(
      (s, g) => s + g.fleet,
      0,
    );

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="rounded-card-lg border border-teal-200 bg-teal-900 px-4 py-3 shadow-card-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
          Clusters
        </div>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[28px] font-bold leading-none text-white">
            3
          </span>
        </div>
        <div className="mt-1 text-[11.5px] text-teal-400">
          Fixed operational model
        </div>
      </div>

      {CLUSTER_IDS.map((c) => {
        const m = CLUSTER_META[c];
        return (
          <div
            key={c}
            className="rounded-card-lg border border-ink-200 bg-white px-4 py-3 shadow-card-sm"
            style={{ borderLeftWidth: 3, borderLeftColor: m.color }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              {m.name}
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span
                className="text-[28px] font-bold leading-none"
                style={{ color: m.color }}
              >
                {govCountFor(c)}
              </span>
              <span className="text-[13px] text-ink-400">govs</span>
            </div>
            <div className="mt-1 text-[11.5px] text-ink-500">
              {fleetFor(c).toLocaleString()} tankers · {m.contractor}
            </div>
          </div>
        );
      })}

      <div className="col-span-4 -mt-1 text-right text-[11px] text-ink-400">
        {totalFleet.toLocaleString()} total tankers across all clusters
      </div>
    </div>
  );
}
