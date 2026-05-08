import { useState } from 'react';
import { Button, Modal, Select, FormField } from '@/atoms';
import type { ApiInspectionRecord } from '@/types/inspection';
import { formatInspectionDate } from '../../inspectionHelpers';
import { TankerTypeChip } from '../TankerTypeChip';

const INSPECTOR_OPTIONS = [
  { value: 'Ahmed Al-Rashidi', label: 'Ahmed Al-Rashidi' },
  { value: 'Ahmed Al-Balushi', label: 'Ahmed Al-Balushi' },
  { value: 'Salim Al-Hinai', label: 'Salim Al-Hinai' },
  { value: 'Fatma Al-Zadjali', label: 'Fatma Al-Zadjali' },
  { value: 'Hamed Al-Rashdi', label: 'Hamed Al-Rashdi' },
  { value: 'Khalid Al-Rawahi', label: 'Khalid Al-Rawahi' },
  { value: 'Omar Al-Siyabi', label: 'Omar Al-Siyabi' },
];

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

type ModalProps = {
  record: ApiInspectionRecord;
  open: boolean;
  onClose: () => void;
  onConfirm: (inspector: string, date: string) => void;
};

function AssignInspectorModal({
  record,
  open,
  onClose,
  onConfirm,
}: ModalProps) {
  const [inspector, setInspector] = useState(record.inspector_name ?? '');
  const [date, setDate] = useState(tomorrow());

  const handleClose = () => {
    setInspector(record.inspector_name ?? '');
    setDate(tomorrow());
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Assign for Inspection"
      subtitle={`${record.plate} · ${record.cluster}`}
      footer={
        <div className="flex w-full justify-end gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!inspector || !date}
            onClick={() => {
              onConfirm(inspector, date);
              handleClose();
            }}
          >
            Confirm Assignment
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 rounded-card bg-ink-50 px-4 py-3.5">
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
              Plate
            </div>
            <div className="font-mono text-[13px] font-semibold text-ink-800">
              {record.plate}
            </div>
          </div>
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
              Type
            </div>
            <TankerTypeChip type={record.tanker_type as 'DW' | 'SW' | 'TE'} />
          </div>
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
              Governorate
            </div>
            <div className="text-[13px] text-ink-700">{record.governorate}</div>
          </div>
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
              Submitted
            </div>
            <div className="text-[13px] text-ink-700">
              {formatInspectionDate(record.submitted_at)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Assign Inspector" required>
            <Select
              options={INSPECTOR_OPTIONS}
              value={inspector}
              onChange={(v) => setInspector(v)}
              placeholder="Select inspector"
            />
          </FormField>
          <FormField label="Scheduled Date" required>
            <input
              type="date"
              value={date}
              min={tomorrow()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-card border border-ink-300 px-3 py-[9px] text-[13px] text-ink-900 outline-none transition focus:border-teal-600 focus:ring-3 focus:ring-teal-50"
            />
          </FormField>
        </div>
      </div>
    </Modal>
  );
}

type Props = {
  record: ApiInspectionRecord;
  onAssign: (
    record: ApiInspectionRecord,
    inspector: string,
    date: string,
  ) => void;
};

export function SubmittedRow({ record, onAssign }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

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
          {formatInspectionDate(record.submitted_at)}
        </td>
        <td className="whitespace-nowrap px-4 py-3 text-right">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setModalOpen(true)}
          >
            Assign Inspector
          </Button>
        </td>
      </tr>
      <AssignInspectorModal
        record={record}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(inspector, date) => onAssign(record, inspector, date)}
      />
    </>
  );
}
