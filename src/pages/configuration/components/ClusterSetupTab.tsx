import { useState } from 'react';
import { Button } from '@/atoms';
import { CLUSTER_META, GOVERNORATES } from '@/constants/configuration';
import type { ClusterId } from '@/types/configuration';
import { ClusterContractorsCard } from './ClusterContractorsCard';
import { ClusterKpiStrip } from './ClusterKpiStrip';
import { GovernorateAssignmentCard } from './GovernorateAssignmentCard';
import { OnboardContractorCard } from './OnboardContractorCard';

const INITIAL_GOV_ASSIGNMENTS: Record<string, ClusterId> = Object.fromEntries(
  GOVERNORATES.map((g) => [g.name, g.cluster]),
);

const INITIAL_CONTRACTOR_ASSIGNMENTS: Record<string, ClusterId> = {
  [CLUSTER_META[1].contractor]: 1,
  [CLUSTER_META[2].contractor]: 2,
  [CLUSTER_META[3].contractor]: 3,
};

export function ClusterSetupTab() {
  const [govAssignments, setGovAssignments] = useState(INITIAL_GOV_ASSIGNMENTS);
  const [contractorAssignments, setContractorAssignments] = useState(
    INITIAL_CONTRACTOR_ASSIGNMENTS,
  );

  const handleGovAssign = (gov: string, cluster: ClusterId) =>
    setGovAssignments((prev) => ({ ...prev, [gov]: cluster }));

  const handleContractorAssign = (contractor: string, cluster: ClusterId) =>
    setContractorAssignments((prev) => ({ ...prev, [contractor]: cluster }));

  return (
    <div className="flex flex-col gap-4">
      <ClusterKpiStrip govAssignments={govAssignments} />

      <div className="flex items-start gap-3 rounded-card border-l-[3px] border-teal-700 bg-white px-4 py-3 shadow-card-sm">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[13px] font-bold text-teal-900">
          i
        </div>
        <p className="text-[13px] leading-relaxed text-ink-700">
          Every governorate in Oman is assigned to exactly one cluster. Use the
          pill group on each row to change the assignment — fleet totals for the
          affected clusters recalculate instantly. Changes are audit-logged.
        </p>
      </div>

      <div className="grid grid-cols-2 items-start gap-4">
        <GovernorateAssignmentCard
          assignments={govAssignments}
          onAssign={handleGovAssign}
        />

        <div className="flex flex-col gap-4">
          <ClusterContractorsCard
            assignments={contractorAssignments}
            onAssign={handleContractorAssign}
          />
          <OnboardContractorCard />
          <div className="flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
