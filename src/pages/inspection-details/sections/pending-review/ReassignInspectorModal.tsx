import { useEffect, useState } from 'react';
import { Modal } from '@/atoms/Modal';
import {
  assignInspector,
  fetchInspectors,
  type InspectorOption,
} from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  data: InspectionDetailsApiResponse;
  onSuccess: () => void;
};

export function ReassignInspectorModal({
  open,
  onClose,
  data,
  onSuccess,
}: Props) {
  const { tanker, assignment } = data;

  const [inspectors, setInspectors] = useState<InspectorOption[]>([]);
  const [loadingInspectors, setLoadingInspectors] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectError, setSelectError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoadingInspectors(true);
    fetchInspectors()
      .then((res) => {
        if (res.success) {
          setInspectors(
            res.data.filter((i) => i.name !== assignment.inspector_name),
          );
        }
      })
      .finally(() => setLoadingInspectors(false));
  }, [open, assignment.inspector_name]);

  const handleClose = () => {
    if (submitting) return;
    setSelectedId('');
    setSelectError(false);
    setError(null);
    onClose();
  };

  const handleReassign = async () => {
    if (!selectedId) {
      setSelectError(true);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await assignInspector(data.id, selectedId);
      if (!res.success) {
        setError(
          res.error?.description ?? 'Reassignment failed. Please try again.',
        );
        return;
      }
      onClose();
      onSuccess();
    } catch {
      setError('Reassignment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Reassign Inspector"
      subtitle={`${tanker.plate} — ${data.id}`}
      width={460}
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="h-9 rounded-lg border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReassign}
            disabled={submitting || loadingInspectors}
            className="h-9 rounded-lg bg-teal-700 px-4 text-[13px] font-semibold text-white hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Reassigning…' : 'Reassign Inspector'}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-[22px] leading-none mt-0.5">👤</span>
          <p className="text-[13px] text-ink-700">
            Change the inspector assigned to this inspection.
          </p>
        </div>

        <div className="rounded-lg bg-ink-50 px-4 py-2.5 text-[13px] text-ink-700">
          Current inspector: <strong>{assignment.inspector_name}</strong>
        </div>

        <div className="flex flex-col gap-1.5">
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              if (e.target.value) setSelectError(false);
            }}
            disabled={loadingInspectors}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-[13px] text-ink-700 focus:outline-none focus:ring-2 disabled:opacity-60 ${
              selectError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-ink-200 focus:border-ink-400 focus:ring-ink-100'
            }`}
          >
            <option value="">
              {loadingInspectors
                ? 'Loading inspectors…'
                : '— Select new inspector —'}
            </option>
            {inspectors.map((insp) => (
              <option key={insp.userID} value={insp.userID}>
                {insp.name}
              </option>
            ))}
          </select>
          {selectError && (
            <p className="text-[11px] text-red-600">
              Please select an inspector.
            </p>
          )}
        </div>

        <p className="text-[12px] text-ink-500">
          The new inspector will need to reschedule the inspection.
        </p>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}
