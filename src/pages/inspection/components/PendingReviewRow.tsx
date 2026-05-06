import { Badge, Button } from '@/atoms';
import type { InspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../inspectionHelpers';
import { TankerTypeChip } from './TankerTypeChip';

type Props = {
  record: InspectionRecord;
  onReview: (record: InspectionRecord) => void;
};

export function PendingReviewRow({ record, onReview }: Props) {
  const priorStage =
    record.tankerType === 'DW' ? (
      <Badge tone="blue" withDot>
        Lab Testing
      </Badge>
    ) : (
      <Badge tone="blue" withDot>
        Physical Inspection
      </Badge>
    );

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
      <td className="px-4 py-3">
        <span className="text-[12px] text-ink-600">
          {formatInspectionDate(record.physicalDate)}
        </span>
        {record.physicalScore !== null && (
          <span className="ml-1 text-[11px] text-ink-400">
            · Score {record.physicalScore}/100
          </span>
        )}
      </td>
      <td className="px-4 py-3">{priorStage}</td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <Button size="sm" variant="primary" onClick={() => onReview(record)}>
          Review &amp; Approve
        </Button>
      </td>
    </tr>
  );
}
