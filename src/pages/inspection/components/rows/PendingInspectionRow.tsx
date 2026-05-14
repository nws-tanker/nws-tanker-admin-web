import type { ApiInspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../../inspectionHelpers';
import { TankerTypeChip } from '../TankerTypeChip';

type Props = { record: ApiInspectionRecord };

export function PendingInspectionRow({ record }: Props) {
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
        {formatInspectionDate(record.scheduled_date)}
      </td>
    </tr>
  );
}
