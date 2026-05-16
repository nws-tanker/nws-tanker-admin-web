import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatPhone } from '@/utils';

const TYPE_LABEL: Record<'DW' | 'SW' | 'TE', string> = {
  DW: '💧 Drinking Water',
  SW: '🚰 Sewage Water',
  TE: '♻️ Treated Effluent',
};

type Props = { data: InspectionDetailsApiResponse };

export function TankerInformation({ data }: Props) {
  const { plate, type, owner } = data.tanker;

  return (
    <div
      className="w-full overflow-hidden rounded-card border border-ink-200 border-l-teal-600 shadow-card-sm"
      style={{ borderLeftWidth: '3px' }}
    >
      <div className="flex items-center border-b border-ink-100 bg-ink-50 px-4 py-3">
        <span className="text-[14px] font-bold text-ink-900">
          Tanker Information
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-white p-4">
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
            Plate Number
          </div>
          <div className="font-mono text-[16px] font-bold text-ink-800">
            {plate}
          </div>
        </div>
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
            Owner Name
          </div>
          <div className="text-[13px] text-ink-800">{owner.name}</div>
        </div>
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
            Tanker Type
          </div>
          <div className="text-[13px] text-ink-800">{TYPE_LABEL[type]}</div>
        </div>
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
            Contact
          </div>
          <div className="text-[13px] text-ink-800">
            {formatPhone(owner.phone)}
          </div>
        </div>
      </div>
    </div>
  );
}
