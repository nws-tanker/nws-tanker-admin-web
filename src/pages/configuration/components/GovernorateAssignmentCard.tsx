import { ClusterPill } from '@/atoms/ClusterPill';
import {
  CLUSTER_IDS,
  CLUSTER_META,
  GOVERNORATES,
} from '@/constants/configuration';
import type { ClusterId } from '@/types/configuration';

type Props = {
  assignments: Record<string, ClusterId>;
  onAssign: (governorate: string, cluster: ClusterId) => void;
};

const totalFleet = GOVERNORATES.reduce((s, g) => s + g.fleet, 0);

export function GovernorateAssignmentCard({ assignments, onAssign }: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3.5">
        <div>
          <h3 className="text-[14px] font-semibold text-ink-900">
            Governorate → Cluster assignment
          </h3>
          <p className="mt-0.5 text-[12px] text-ink-500">
            {GOVERNORATES.length} governorates · {totalFleet.toLocaleString()}{' '}
            total tankers
          </p>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <table className="w-full table-fixed text-[13px]">
          <colgroup>
            <col style={{ width: '44px' }} />
            <col style={{ width: '38%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                #
              </th>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Governorate
              </th>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Cluster assignment
              </th>
            </tr>
          </thead>
          <tbody>
            {GOVERNORATES.map((g, i) => (
              <tr
                key={g.name}
                className="border-b border-ink-100 last:border-0 hover:bg-ink-50"
              >
                <td className="px-4 py-2.5 font-mono text-[12px] text-ink-400">
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td className="px-4 py-2.5 font-medium text-ink-800">
                  {g.name}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {CLUSTER_IDS.map((c) => (
                      <ClusterPill
                        key={c}
                        label={CLUSTER_META[c].name}
                        color={CLUSTER_META[c].color}
                        active={assignments[g.name] === c}
                        onClick={() => onAssign(g.name, c)}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
