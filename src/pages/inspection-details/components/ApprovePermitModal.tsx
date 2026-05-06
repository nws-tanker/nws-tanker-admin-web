import { Modal } from '@/atoms/Modal';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = {
  open: boolean;
  onClose: () => void;
  data: InspectionDetailsApiResponse;
};

export function ApprovePermitModal({ open, onClose, data }: Props) {
  const { tanker, assignment } = data;
  const hasWhatsApp = !!tanker.owner.whatsapp;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Approve & Generate Permit"
      subtitle={`${tanker.plate} — ${data.id}`}
      width={480}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border border-ink-200 bg-white px-4 text-[13px] font-medium text-ink-700 hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-9 rounded-lg bg-teal-700 px-4 text-[13px] font-semibold text-white hover:bg-teal-800"
          >
            Confirm Approval
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4 text-[13px] text-ink-700 leading-relaxed">
        <p>
          Approving this inspection will generate a permit for{' '}
          <strong>{tanker.plate}</strong> valid for 12 months.
        </p>

        <div className="rounded-lg border border-ink-100 bg-ink-50 px-4 py-3 flex flex-col gap-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400 mb-1">
            Tanker Details
          </div>
          <div className="flex gap-6">
            <div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wide">
                Plate
              </div>
              <div className="font-mono text-[14px] font-bold text-ink-800">
                {tanker.plate}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wide">
                Type
              </div>
              <div className="text-[13px] font-medium text-ink-700">
                {tanker.type}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wide">
                Inspector
              </div>
              <div className="text-[13px] font-medium text-ink-700">
                {assignment.inspector_name}
              </div>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-ink-500">
          {hasWhatsApp
            ? `📱 Permit will be sent automatically via WhatsApp to ${tanker.owner.whatsapp}.`
            : '⚠️ No WhatsApp number on record — permit cannot be sent automatically.'}
        </p>
      </div>
    </Modal>
  );
}
