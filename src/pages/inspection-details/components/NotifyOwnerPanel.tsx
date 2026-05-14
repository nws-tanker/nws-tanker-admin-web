import { Button } from '@/atoms';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

export function NotifyOwnerPanel({ data }: Props) {
  return (
    <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
      <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
        <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
          NOTIFY OWNER
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink-700">Send via WhatsApp</span>
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
        <Button variant="primary" size="lg" className="w-full justify-center">
          Send Now
        </Button>
      </div>
    </div>
  );
}
