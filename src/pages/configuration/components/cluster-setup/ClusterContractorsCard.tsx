import { ClusterPill } from '@/atoms/ClusterPill';
import {
  CLUSTER_COLORS,
  DEFAULT_CLUSTER_COLOR,
} from '@/constants/configuration';
import type {
  ClusterSetupCluster,
  ClusterSetupContractor,
} from '@/types/configuration';

type Props = {
  contractors: ClusterSetupContractor[];
  clusters: ClusterSetupCluster[];
  assignments: Record<string, number>;
  onAssign: (contractorName: string, clusterId: number) => void;
};

export function ClusterContractorsCard({
  contractors,
  clusters,
  assignments,
  onAssign,
}: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-200 px-5 py-3.5">
        <h3 className="text-[14px] font-semibold text-ink-900">
          Cluster contractors
        </h3>
        <p className="mt-0.5 text-[12px] text-ink-500">
          One contractor per cluster · service agreements
        </p>
      </div>

      <div className="overflow-x-hidden">
        <table className="w-full text-[13px]">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Contractor
              </th>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Cluster assignment
              </th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((ct) => (
              <tr
                key={ct.contractorId}
                className="border-b border-ink-100 last:border-0 hover:bg-ink-50"
              >
                <td className="px-4 py-2.5 font-medium text-ink-800">
                  {ct.contractorName}
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
                        active={assignments[ct.contractorName] === c.clusterId}
                        onClick={() => onAssign(ct.contractorName, c.clusterId)}
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
