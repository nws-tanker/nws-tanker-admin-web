import {
  CLUSTER_COLORS,
  DEFAULT_CLUSTER_COLOR,
} from '@/constants/configuration';
import type {
  ClusterSetupCluster,
  ClusterSetupGovernorate,
  ClusterSetupSummary,
} from '@/types/configuration';

import {
  getGovCountForCluster,
  getTankerCountForCluster,
} from '../../configurationHelpers';

type Props = {
  summary: ClusterSetupSummary;
  clusters: ClusterSetupCluster[];
  governorates: ClusterSetupGovernorate[];
  govAssignments: Record<string, number>;
};

export function ClusterKpiStrip({
  summary,
  clusters,
  governorates,
  govAssignments,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="rounded-card-lg border border-teal-200 bg-teal-900 px-4 py-3 shadow-card-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
          Clusters
        </div>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-[28px] font-bold leading-none text-white">
            {summary.totalClusters}
          </span>
        </div>
        <div className="mt-1 text-[11.5px] text-teal-400">
          {summary.totalGovernorates} governorates · {summary.totalTankers}{' '}
          tankers
        </div>
      </div>

      {clusters.map((c) => {
        const color = CLUSTER_COLORS[c.clusterId] ?? DEFAULT_CLUSTER_COLOR;
        return (
          <div
            key={c.clusterId}
            className="rounded-card-lg border border-ink-200 bg-white px-4 py-3 shadow-card-sm"
            style={{ borderLeftWidth: 3, borderLeftColor: color }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              {c.name}
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span
                className="text-[28px] font-bold leading-none"
                style={{ color }}
              >
                {getGovCountForCluster(
                  c.clusterId,
                  governorates,
                  govAssignments,
                )}
              </span>
              <span className="text-[13px] text-ink-400">govs</span>
            </div>
            <div className="mt-1 text-[11.5px] text-ink-500">
              {getTankerCountForCluster(
                c.clusterId,
                governorates,
                govAssignments,
              ).toLocaleString()}{' '}
              tankers · {c.contractorName}
            </div>
          </div>
        );
      })}

      <div className="col-span-4 -mt-1 text-right text-[11px] text-ink-400">
        {summary.totalTankers.toLocaleString()} total tankers across all
        clusters
      </div>
    </div>
  );
}
