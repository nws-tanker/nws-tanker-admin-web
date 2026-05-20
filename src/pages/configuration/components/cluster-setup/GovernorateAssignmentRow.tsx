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
  index: number;
  governorate: ClusterSetupGovernorate;
  clusters: ClusterSetupCluster[];
  selectedClusterId: number | undefined;
  onAssign: (governorate: string, clusterId: number) => void;
};

export function GovernorateAssignmentRow({
  index,
  governorate,
  clusters,
  selectedClusterId,
  onAssign,
}: Props) {
  return (
    <tr className="border-b border-ink-100 last:border-0 hover:bg-ink-50">
      <td className="px-4 py-2.5 font-mono text-[12px] text-ink-400">
        {String(index + 1).padStart(2, '0')}
      </td>
      <td className="px-4 py-2.5 font-medium text-ink-800">
        {governorate.name}
      </td>
      <td className="px-4 py-2.5">
        <div className="flex flex-wrap gap-1">
          {clusters.map((c) => (
            <ClusterPill
              key={c.clusterId}
              label={c.name}
              color={CLUSTER_COLORS[c.clusterId] ?? DEFAULT_CLUSTER_COLOR}
              active={selectedClusterId === c.clusterId}
              onClick={() => onAssign(governorate.name, c.clusterId)}
            />
          ))}
        </div>
      </td>
    </tr>
  );
}
