import { useState } from 'react';
import { Modal } from '@/atoms/Modal';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  data: InspectionDetailsApiResponse;
};

export function RejectInspectionModal({ open, onClose, data }: Props) {
  const { tanker, lab } = data;
  const isDW = tanker.type === 'DW';
  const labUploaded = !!lab.report.id;

  const [stage, setStage] = useState<'inspection' | 'lab' | null>(null);

  function handleClose() {
    setStage(null);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Reject Inspection"
      subtitle={`${tanker.plate} — ${data.id}`}
      width={500}
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            className="h-9 rounded-lg border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-9 rounded-lg bg-red-600 px-4 text-[13px] font-semibold text-white hover:bg-red-700"
          >
            Confirm Rejection
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {isDW && (
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-[12px] font-semibold text-ink-700">
                Rejection Stage <span className="text-red-600">*</span>
              </label>
              <p className="mt-0.5 text-[12px] text-ink-500">
                At which step is this DW tanker being rejected?
              </p>
            </div>
            <div className="flex gap-2">
              <label
                className={`flex flex-1 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] transition-colors ${
                  stage === 'lab'
                    ? 'cursor-not-allowed border-ink-100 text-ink-300'
                    : stage === 'inspection'
                      ? 'cursor-pointer border-red-300 bg-red-50 text-ink-800'
                      : 'cursor-pointer border-ink-200 text-ink-700 hover:bg-ink-50'
                }`}
              >
                <input
                  type="radio"
                  name="rej-stage"
                  value="inspection"
                  disabled={stage === 'lab'}
                  checked={stage === 'inspection'}
                  onChange={() => setStage('inspection')}
                  className="accent-red-600 disabled:opacity-40"
                />
                Physical Inspection
              </label>
              <label
                className={`flex flex-1 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] transition-colors ${
                  !labUploaded || stage === 'inspection'
                    ? 'cursor-not-allowed border-ink-100 text-ink-300'
                    : stage === 'lab'
                      ? 'cursor-pointer border-red-300 bg-red-50 text-ink-800'
                      : 'cursor-pointer border-ink-200 text-ink-700 hover:bg-ink-50'
                }`}
              >
                <input
                  type="radio"
                  name="rej-stage"
                  value="lab"
                  disabled={!labUploaded || stage === 'inspection'}
                  checked={stage === 'lab'}
                  onChange={() => setStage('lab')}
                  className="accent-red-600 disabled:opacity-40"
                />
                Lab Results
                {!labUploaded && (
                  <span className="text-[11px] text-ink-400">
                    (not uploaded)
                  </span>
                )}
              </label>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-ink-700">
            Rejection Reason <span className="text-red-600">*</span>
          </label>
          <p className="text-[12px] text-ink-500">
            The inspector will be notified with this reason.
          </p>
          <textarea
            rows={4}
            placeholder="Enter rejection reason…"
            className="w-full resize-vertical rounded-lg border border-ink-200 px-3 py-2 text-[13px] text-ink-700 placeholder:text-ink-300 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>
    </Modal>
  );
}
