import { Button } from '@/atoms';
import type { ApiInspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../../inspectionHelpers';
import { TankerTypeChip } from '../TankerTypeChip';

type Props = {
  record: ApiInspectionRecord;
  onAssign: (
    record: ApiInspectionRecord,
    inspector: string,
    date: string,
  ) => void;
  onView?: (record: ApiInspectionRecord) => void;
};

export function SubmittedRow({ record, onView }: Props) {
  return (
    <tr className="border-b border-ink-100 hover:bg-ink-25">
      <td className="px-4 py-3 font-mono text-[13px] font-semibold text-ink-800">
        {record.plate}
      </td>
      <td className="px-4 py-3">
        <TankerTypeChip type={record.tanker_type as 'DW' | 'SW' | 'TE'} />
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-700">
        {record.governorate}
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-700">{record.cluster}</td>
      <td className="px-4 py-3 text-[13px] text-ink-700">
        {record.inspector_name}
      </td>
      <td className="px-4 py-3 text-[12px] text-ink-600">
        {formatInspectionDate(record.submitted_at)}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <Button size="sm" variant="ghost" onClick={() => onView?.(record)}>
          View Details
        </Button>
      </td>
    </tr>
  );
}
