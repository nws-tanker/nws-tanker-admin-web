import { Button } from '@/atoms';
import type { InspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../inspectionHelpers';
import { TankerTypeChip } from './TankerTypeChip';

type Props = {
  record: InspectionRecord;
  onView: (record: InspectionRecord) => void;
  onQueueReinspection: (record: InspectionRecord) => void;
};

export function RejectedRow({ record, onView, onQueueReinspection }: Props) {
  return (
    <tr className="border-b border-ink-100 hover:bg-ink-25">
      <td className="px-4 py-3 font-mono text-[13px] font-semibold text-ink-800">
        {record.plate}
      </td>
      <td className="px-4 py-3">
        <TankerTypeChip type={record.tankerType} />
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-700">
        {record.governorate}
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-700">{record.cluster}</td>
      <td className="px-4 py-3 text-[13px] text-ink-700">
        {record.inspectorName}
      </td>
      <td className="px-4 py-3 text-[12px] text-ink-600">
        {formatInspectionDate(record.physicalDate)}
      </td>
      <td className="max-w-[260px] px-4 py-3 text-[12px] text-red-700">
        {record.rejectionReason ?? '—'}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Button size="sm" variant="ghost" onClick={() => onView(record)}>
            View Details
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onQueueReinspection(record)}
          >
            ↩ Queue Re-inspection
          </Button>
        </div>
      </td>
    </tr>
  );
}
