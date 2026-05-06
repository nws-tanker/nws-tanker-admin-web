import { Button } from '@/atoms';
import type { InspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../inspectionHelpers';
import { TankerTypeChip } from './TankerTypeChip';

type Props = {
  record: InspectionRecord;
  onView: (record: InspectionRecord) => void;
};

export function LabTestingRow({ record, onView }: Props) {
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
      <td className="px-4 py-3 text-[12px] text-ink-500">
        {record.physicalScore !== null
          ? `Score ${record.physicalScore}/100`
          : '—'}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <Button size="sm" variant="ghost" onClick={() => onView(record)}>
          View Details
        </Button>
      </td>
    </tr>
  );
}
