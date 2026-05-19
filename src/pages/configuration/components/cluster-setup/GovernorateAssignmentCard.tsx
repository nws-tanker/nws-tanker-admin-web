import { ClusterPill } from '@/atoms/ClusterPill';
import {
  CLUSTER_COLORS,
  DEFAULT_CLUSTER_COLOR,
} from '@/constants/configuration';
import type {
  ClusterSetupCluster,
  ClusterSetupGovernorate,
} from '@/types/configuration';

type Props = {
  governorates: ClusterSetupGovernorate[];
  clusters: ClusterSetupCluster[];
  assignments: Record<string, number>;
  onAssign: (governorate: string, clusterId: number) => void;
};

export function GovernorateAssignmentCard({
  governorates,
  clusters,
  assignments,
  onAssign,
}: Props) {
  const totalTankers = governorates.reduce(
    (s, g) => s + g.dwCount + g.swCount + g.teCount,
    0,
  );

  const clusterOrder = new Map(clusters.map((c, i) => [c.clusterId, i]));
  const sortedGovernorates = [...governorates].sort((a, b) => {
    const ai = clusterOrder.get(assignments[a.name]) ?? Number.MAX_SAFE_INTEGER;
    const bi = clusterOrder.get(assignments[b.name]) ?? Number.MAX_SAFE_INTEGER;
    return ai - bi;
  });

  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3.5">
        <div>
          <h3 className="text-[14px] font-semibold text-ink-900">
            Governorate → Cluster assignment
          </h3>
          <p className="mt-0.5 text-[12px] text-ink-500">
            {governorates.length} governorates · {totalTankers.toLocaleString()}{' '}
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
            {sortedGovernorates.map((g, i) => (
              <tr
                key={g.id}
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
                    {clusters.map((c) => (
                      <ClusterPill
                        key={c.clusterId}
                        label={c.name}
                        color={
                          CLUSTER_COLORS[c.clusterId] ?? DEFAULT_CLUSTER_COLOR
                        }
                        active={assignments[g.name] === c.clusterId}
                        onClick={() => onAssign(g.name, c.clusterId)}
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
