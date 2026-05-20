import { useMemo, useState } from 'react';
import { Button, useToast } from '@/atoms';
import { updateGovernorateClusterMappingApi } from '@/services/configurationService';
import type {
  ClusterSetupCluster,
  ClusterSetupGovernorate,
} from '@/types/configuration';
import { GovernorateAssignmentRow } from './GovernorateAssignmentRow';
import {
  buildMappingsPayload,
  countTotalTankers,
  sortGovernoratesByCluster,
} from './governorateAssignmentHelpers';

type Props = {
  governorates: ClusterSetupGovernorate[];
  clusters: ClusterSetupCluster[];
  assignments: Record<string, number>;
  onAssign: (governorate: string, clusterId: number) => void;
  onSaved?: () => void;
};

export function GovernorateAssignmentCard({
  governorates,
  clusters,
  assignments,
  onAssign,
  onSaved,
}: Props) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const totalTankers = countTotalTankers(governorates);
  const sortedGovernorates = useMemo(
    () => sortGovernoratesByCluster(governorates, clusters, assignments),
    [governorates, clusters, assignments],
  );

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const response = await updateGovernorateClusterMappingApi({
        mappings: buildMappingsPayload(governorates, assignments),
      });
      if (response.success) {
        toast.show('Governorate assignments saved');
        onSaved?.();
      } else {
        toast.show(
          response.error?.description ?? 'Failed to save assignments',
          { tone: 'error' },
        );
      }
    } catch {
      toast.show('Failed to save assignments', { tone: 'error' });
    } finally {
      setSaving(false);
    }
  };

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

      <div className="flex justify-end border-t border-ink-200 px-5 py-3">
        <Button variant="primary" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
