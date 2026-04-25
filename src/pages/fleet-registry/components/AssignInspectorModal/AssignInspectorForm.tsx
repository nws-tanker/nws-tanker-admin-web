import { useMemo } from 'react';
import { Modal, useToast } from '@/atoms';
import { TYPE_LABELS } from '@/constants/fleet';
import { TANKER_TYPE } from '@/types';
import type { Assignment, Inspector, SampleCollector, Tanker } from '@/types';
import { AssignmentOverrideNote } from './AssignmentOverrideNote';
import { AssignModalFooter } from './AssignModalFooter';
import type { AssignSubmitting } from './index';
import { InspectorField } from './InspectorField';
import { SamplerField } from './SamplerField';
import { useAssignInspectorForm } from './useAssignInspectorForm';

type Props = {
  tanker: Tanker;
  clusterName: string;
  inspectors: Inspector[];
  samplers: SampleCollector[];
  submitting: AssignSubmitting;
  onSave: (tankerId: string, assignment: Assignment) => void;
  onClear: (tankerId: string) => void;
  onClose: () => void;
};

export function AssignInspectorForm({
  tanker,
  clusterName,
  inspectors,
  samplers,
  submitting,
  onSave,
  onClear,
  onClose,
}: Props) {
  const canCollectSample = tanker.tankerType === TANKER_TYPE.DRINKING_WATER;
  const assignment = tanker.assignment;

  // Inspectors and sample collectors both belong to a single cluster (N:1) —
  // only offer the ones that can serve this tanker's cluster.
  const eligibleInspectors = useMemo(
    () => inspectors.filter((i) => i.clusterId === tanker.clusterId),
    [inspectors, tanker.clusterId],
  );
  const eligibleSamplers = useMemo(
    () => samplers.filter((s) => s.clusterId === tanker.clusterId),
    [samplers, tanker.clusterId],
  );

  const existingInspector = assignment
    ? (inspectors.find((i) => i.id === assignment.inspectorId) ?? null)
    : null;

  const { show: showToast } = useToast();

  const form = useAssignInspectorForm({
    initial: assignment ?? undefined,
    canCollectSample,
    onSubmit: (next) => onSave(tanker.id, next),
    onError: showToast,
  });

  return (
    <Modal
      open
      title="Assign Inspector"
      subtitle={`Plate ${tanker.plateNumber} · ${TYPE_LABELS[tanker.tankerType]} · ${clusterName}`}
      width={420}
      onClose={onClose}
      footer={
        <AssignModalFooter
          hasAssignment={!!assignment}
          submitting={submitting}
          onCancel={onClose}
          onClear={() => onClear(tanker.id)}
          onSubmit={form.submit}
        />
      }
    >
      <div className="flex flex-col gap-4">
        <InspectorField
          value={form.inspectorId}
          onChange={form.setInspectorId}
          inspectors={eligibleInspectors}
        />
        {canCollectSample ? (
          <SamplerField
            value={form.samplerId}
            onChange={form.setSamplerId}
            samplers={eligibleSamplers}
          />
        ) : null}
        {existingInspector ? (
          <AssignmentOverrideNote inspectorName={existingInspector.name} />
        ) : null}
      </div>
    </Modal>
  );
}
