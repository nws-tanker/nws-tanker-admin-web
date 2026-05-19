import { useEffect, useState } from 'react';
import { Button } from '@/atoms';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchClusterSetup } from '@/store/apiSlices/clusterSetupApiSlice';
import { States } from '@/store/types';
import { ClusterContractorsCard } from './ClusterContractorsCard';
import { ClusterKpiStrip } from './ClusterKpiStrip';
import { GovernorateAssignmentCard } from './GovernorateAssignmentCard';
import { OnboardContractorCard } from './OnboardContractorCard';

export function ClusterSetupTab() {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector((s) => s.clusterSetupApi);

  const [govAssignments, setGovAssignments] = useState<Record<string, number>>(
    {},
  );
  const [contractorAssignments, setContractorAssignments] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    dispatch(fetchClusterSetup());
  }, [dispatch]);

  useEffect(() => {
    if (apiState === States.SUCCESS && data) {
      setGovAssignments(
        Object.fromEntries(data.governorates.map((g) => [g.name, g.clusterId])),
      );
      setContractorAssignments(
        Object.fromEntries(
          data.contractors.map((c) => [c.contractorName, c.clusterId]),
        ),
      );
    }
  }, [apiState, data]);

  const handleGovAssign = (gov: string, clusterId: number) =>
    setGovAssignments((prev) => ({ ...prev, [gov]: clusterId }));

  const handleContractorAssign = (contractor: string, clusterId: number) =>
    setContractorAssignments((prev) => ({ ...prev, [contractor]: clusterId }));

  if (apiState === States.LOADING || apiState === States.PRELOADING) {
    return (
      <div className="flex h-48 items-center justify-center text-[13px] text-ink-400">
        Loading cluster setup…
      </div>
    );
  }

  if (apiState === States.ERROR || !data) {
    return (
      <div className="flex h-48 items-center justify-center text-[13px] text-red-500">
        {error?.description ?? 'Failed to load cluster setup'}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ClusterKpiStrip
        summary={data.summary}
        clusters={data.clusters}
        governorates={data.governorates}
        govAssignments={govAssignments}
      />

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
          governorates={data.governorates}
          clusters={data.clusters}
          assignments={govAssignments}
          onAssign={handleGovAssign}
          onSaved={() => dispatch(fetchClusterSetup())}
        />

        <div className="flex flex-col gap-4">
          <ClusterContractorsCard
            contractors={data.contractors}
            clusters={data.clusters}
            assignments={contractorAssignments}
            onAssign={handleContractorAssign}
          />
          <OnboardContractorCard
            onSuccess={() => dispatch(fetchClusterSetup())}
          />
          <div className="flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
