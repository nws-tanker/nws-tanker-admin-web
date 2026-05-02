import { Button, Modal } from '@/atoms';
import { TYPE_LABELS } from '@/constants/fleet';
import type { Tanker } from '@/types';
import { TankerPermitCard } from './TankerPermitCard';
import { TankerSummaryGrid } from './TankerSummaryGrid';

type Props = {
  tanker: Tanker | null;
  governorateName: string;
  clusterName: string;
  onClose: () => void;
};

export function TankerDetailsModal({
  tanker,
  governorateName,
  clusterName,
  onClose,
}: Props) {
  if (!tanker) return null;

  return (
    <Modal
      open
      title={tanker.plateNo}
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
      </div>
    </Modal>
  );
}
