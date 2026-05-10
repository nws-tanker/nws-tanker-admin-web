import { useState } from 'react';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { RejectInspectionModal } from '../pending-review/RejectInspectionModal';

type Props = {
  data: InspectionDetailsApiResponse;
  onRefetch: () => void;
};

export function SubmittedSidebar({ data, onRefetch }: Props) {
  const [rejectOpen, setRejectOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-[#fefce8] border border-[#fde68a] rounded-card p-3.5 flex gap-2.5">
          <span style={{ fontSize: 18 }}>⏳</span>
          <div>
            <p className="text-[12px] font-bold text-yellow-700">
              Awaiting Review
            </p>
            <p className="text-[11px] text-yellow-600 mt-0.5">
              This inspection has been submitted and is pending review. Actions
              will be available once it enters review.
            </p>
          </div>
        </div>

        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
          <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
            <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
              ACTIONS
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3.5">
            <button
              disabled
              className="w-full h-[46px] text-[14px] font-semibold bg-teal-700 text-white rounded-card opacity-40 cursor-not-allowed"
            >
              ✓ Approve &amp; Generate Permit
            </button>
            <button
              onClick={() => setRejectOpen(true)}
              className="w-full h-10 bg-red-600 text-white rounded-card text-[13px] hover:bg-red-700 transition-colors"
            >
              ✕ Reject Inspection
            </button>
            <button
              disabled
              className="w-full h-10 border border-ink-200 text-ink-700 rounded-card text-[13px] bg-white opacity-40 cursor-not-allowed"
            >
              Cancel Inspection
            </button>
            <button
              disabled
              className="w-full h-10 border border-ink-200 text-ink-700 rounded-card text-[13px] bg-white opacity-40 cursor-not-allowed"
            >
              Reassign Inspector
            </button>
          </div>
        </div>

        <div
          className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white"
          style={{ padding: '14px 16px' }}
        >
          <p className="text-[12px] font-bold text-ink-700 mb-2.5">
            What happens next?
          </p>
          <div className="flex items-start gap-2 mb-1.5">
            <span className="text-[12px] text-teal-700">→</span>
            <span className="text-[12px] text-ink-600">
              Inspection moves to pending review queue
            </span>
          </div>
          <div className="flex items-start gap-2 mb-1.5">
            <span className="text-[12px] text-teal-700">→</span>
            <span className="text-[12px] text-ink-600">
              Admin will review submitted data
            </span>
          </div>
          <div className="flex items-start gap-2 mb-1.5">
            <span className="text-[12px] text-teal-700">→</span>
            <span className="text-[12px] text-ink-600">
              A decision will be recorded in the system
            </span>
          </div>
          <div className="flex items-start gap-2 mb-1.5">
            <span className="text-[12px] text-teal-700">→</span>
            <span className="text-[12px] text-ink-600">
              Inspector will be notified of the outcome
            </span>
          </div>
        </div>

        <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
          <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
            <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
              NOTIFY OWNER
            </span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ink-700">
                Send via WhatsApp
              </span>
              <div className="w-[40px] h-[22px] rounded-full bg-teal-700 flex items-center px-0.5">
                <div className="w-[18px] h-[18px] rounded-full bg-white translate-x-[18px]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ink-700">Send via Email</span>
              <div className="w-[40px] h-[22px] rounded-full bg-teal-700 flex items-center px-0.5">
                <div className="w-[18px] h-[18px] rounded-full bg-white translate-x-[18px]" />
              </div>
            </div>
            <div className="border-t border-ink-100 pt-2.5 flex flex-col gap-2">
              <div>
                <p className="text-[11px] text-ink-400">Phone Number</p>
                <p className="text-[13px] font-semibold text-ink-800">
                  {data.tanker.owner.phone || '—'}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-ink-400">Email Address</p>
                <p className="text-[13px] font-semibold text-ink-800">
                  {data.tanker.owner.email || '—'}
                </p>
              </div>
            </div>
            <div className="bg-ink-50 rounded-card p-2.5 text-[11px] text-ink-500">
              Sent from{' '}
              <span className="font-mono text-ink-700">+968 9100 7700</span>{' '}
              (WhatsApp) &amp;{' '}
              <span className="font-mono text-ink-700">permits@nama.om</span>
            </div>
            <button className="w-full h-[42px] text-[14px] font-semibold bg-teal-700 text-white rounded-card hover:bg-teal-800 transition-colors">
              Send Now
            </button>
          </div>
        </div>
      </div>

      <RejectInspectionModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        data={data}
        onSuccess={onRefetch}
      />
    </>
  );
}
