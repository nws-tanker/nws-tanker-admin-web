import { Button } from '@/atoms';
import type { ApiInspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../../inspectionHelpers';
import { TankerTypeChip } from '@/common-components/TankerTypeChip';
import RequeueInspectionModal from './RequeueInspectionModal';
import { useState } from 'react';

type Props = {
  record: ApiInspectionRecord;
  onView: (record: ApiInspectionRecord) => void;
};

export function RejectedRow({ record, onView }: Props) {
  const [openRequeueInspectionModal, setOpenRequeueInspectionModal] =
    useState<boolean>(false);
  return (
    <>
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
          {formatInspectionDate(record.physical_date)}
        </td>
        <td className="max-w-[260px] px-4 py-3 text-[12px] text-red-700">
          {record.rejection_reason ?? '—'}
        </td>
        <td className="whitespace-nowrap px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-1.5">
            <Button size="sm" variant="ghost" onClick={() => onView(record)}>
              View Details
            </Button>
            {record.is_reinspection === null && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => setOpenRequeueInspectionModal(true)}
              >
                ↩ Queue Re-inspection
              </Button>
            )}
          </div>
        </td>
      </tr>
      <RequeueInspectionModal
        open={openRequeueInspectionModal}
        onClose={() => setOpenRequeueInspectionModal(false)}
        record={record}
      />
    </>
  );
}
