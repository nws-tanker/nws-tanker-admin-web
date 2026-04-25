import { Button, Modal } from '@/atoms';
import { TYPE_LABELS } from '@/constants/fleet';
import type { Inspector, SampleCollector, Tanker } from '@/types';
import { TankerAssignmentCard } from './TankerAssignmentCard';
import { TankerPermitCard } from './TankerPermitCard';
import { TankerSummaryGrid } from './TankerSummaryGrid';

type Props = {
  tanker: Tanker | null;
  governorateName: string;
  clusterName: string;
  inspectors: Inspector[];
  samplers: SampleCollector[];
  onClose: () => void;
};

export function TankerDetailsModal({
  tanker,
  governorateName,
  clusterName,
  inspectors,
  samplers,
  onClose,
}: Props) {
  if (!tanker) return null;

  const assignment = tanker.assignment;
  const inspector =
    (assignment && inspectors.find((i) => i.id === assignment.inspectorId)) ??
    null;
  const sampler =
    (assignment &&
      assignment.samplerId &&
      samplers.find((s) => s.id === assignment.samplerId)) ||
    null;

  return (
    <Modal
      open
      title={tanker.plateNumber}
      subtitle={`${TYPE_LABELS[tanker.tankerType]} · ${clusterName}`}
      width={480}
      onClose={onClose}
      footer={
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <TankerSummaryGrid
          tanker={tanker}
          governorateName={governorateName}
          clusterName={clusterName}
        />
        <TankerPermitCard permit={tanker.permit} />
        <TankerAssignmentCard inspector={inspector} sampler={sampler} />
      </div>
    </Modal>
  );
}
