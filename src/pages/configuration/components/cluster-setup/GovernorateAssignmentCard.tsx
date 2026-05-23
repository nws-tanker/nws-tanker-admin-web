import { useMemo, useState } from 'react';
import { Button } from '@/atoms';
import type {
  ClusterSetupCluster,
  ClusterSetupGovernorate,
} from '@/types/configuration';
import { AddGovernorateModal } from './AddGovernorateModal';
import { GovernorateAssignmentRow } from './GovernorateAssignmentRow';
import {
  countTotalTankers,
  sortGovernoratesByCluster,
} from './governorateAssignmentHelpers';

type Props = {
  governorates: ClusterSetupGovernorate[];
  clusters: ClusterSetupCluster[];
  assignments: Record<string, number>;
  onAssign: (governorate: string, clusterId: number) => void;
  onGovernorateAdded: () => void;
};

export function GovernorateAssignmentCard({
  governorates,
  clusters,
  assignments,
  onAssign,
  onGovernorateAdded,
}: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const totalTankers = countTotalTankers(governorates);
  const sortedGovernorates = useMemo(
    () => sortGovernoratesByCluster(governorates, clusters, assignments),
    [governorates, clusters, assignments],
  );

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
        <Button variant="primary" size="sm" onClick={() => setAddOpen(true)}>
          + Add Governorate
        </Button>
      </div>

      <AddGovernorateModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        clusters={clusters}
        onSuccess={onGovernorateAdded}
      />

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
              <GovernorateAssignmentRow
                key={g.id}
                index={i}
                governorate={g}
                clusters={clusters}
                selectedClusterId={assignments[g.name]}
                onAssign={onAssign}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
