import { useEffect, useMemo, useState } from 'react';
import { Button, Select } from '@/atoms';
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
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleReassign}
            disabled={submitting || loadingInspectors}
          >
            {submitting ? 'Reassigning…' : 'Reassign Inspector'}
          </Button>
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
          <Select
            options={useMemo(
              () =>
                inspectors.map((insp) => ({
                  value: insp.userId,
                  label: insp.name,
                })),
              [inspectors],
            )}
            value={selectedId}
            onChange={(next) => {
              setSelectedId(next);
              if (next) setSelectError(false);
            }}
            placeholder={
              loadingInspectors
                ? 'Loading inspectors…'
                : '— Select new inspector —'
            }
            disabled={loadingInspectors}
            invalid={selectError}
            className="w-full"
          />
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
