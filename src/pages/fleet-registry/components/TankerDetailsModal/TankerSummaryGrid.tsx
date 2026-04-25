import { TYPE_LABELS } from '@/constants/fleet';
import type { Tanker } from '@/types';
import { Field } from './Field';

type Props = {
  tanker: Tanker;
  governorateName: string;
  clusterName: string;
};

export function TankerSummaryGrid({
  tanker,
  governorateName,
  clusterName,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <Field label="Plate No." value={tanker.plateNumber} mono />
      <Field label="Owner" value={tanker.ownerName} />
      <Field label="Tanker Type" value={TYPE_LABELS[tanker.tankerType]} />
      <Field label="Governorate" value={governorateName} />
      <Field label="Cluster" value={clusterName} />
      <Field label="Contact" value={tanker.contact} mono />
    </div>
  );
}
