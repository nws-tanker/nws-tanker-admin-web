import { Button } from '@/atoms';
import { CheckIcon, DownloadIcon } from '@/atoms/icons';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatDate } from '@/utils';

const TANKER_TYPE_LABEL: Record<string, string> = {
  DW: '💧 Drinking Water',
  SW: '🚰 Sewage Water',
  TE: '♻️ Treated Effluent',
};

function daysRemaining(expiresAt: string | null): number | null {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function buildPermitFields(
  permit: InspectionDetailsApiResponse['permit'],
  tanker: InspectionDetailsApiResponse['tanker'],
) {
  return [
    {
      label: 'Permit Number',
      value: permit.permit_number,
      mono: true,
      large: true,
    },
    { label: 'Plate Number', value: tanker.plate, mono: false, large: false },
    {
      label: 'Tanker Type',
      value: TANKER_TYPE_LABEL[tanker.type] ?? tanker.type,
      mono: false,
      large: false,
    },
    {
      label: 'Issued Date',
      value: formatDate(permit.issued_at),
      mono: false,
      large: false,
    },
    {
      label: 'Valid Until',
      value: formatDate(permit.expires_at),
      mono: false,
      large: false,
    },
  ];
}

type Props = { data: InspectionDetailsApiResponse };

export function PermitDetails({ data }: Props) {
  const { permit, tanker } = data;
  if (!permit.permit_number) return null;

  const days = daysRemaining(permit.expires_at);
  const hasWhatsapp = !!tanker.owner.whatsapp;

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
      <div className="border-b border-ink-100 bg-ink-50 px-5 py-3">
        <span className="text-[13px] font-semibold text-ink-800">
          Permit Details
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Permit card */}
        <div className="rounded-card-lg bg-teal-900 p-5 text-white">
          {/* Header */}
          <div className="mb-4 flex items-center gap-2.5 border-b border-white/15 pb-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-white text-[14px] font-bold text-teal-900">
              N
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">Nama</div>
              <div className="text-[10px] text-white/55">
                Tanker Operating Permit
              </div>
            </div>
          </div>

          {/* Fields */}
          {buildPermitFields(permit, tanker).map(
            ({ label, value, mono, large }) => (
              <div key={label} className="mb-2.5">
                <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/45">
                  {label}
                </div>
                <div
                  className={[
                    large ? 'text-[15px] font-bold' : 'text-[12px]',
                    mono ? 'font-mono' : '',
                    'text-white',
                  ].join(' ')}
                >
                  {value}
                </div>
              </div>
            ),
          )}

          {/* Status badge */}
          <div className="mt-3 flex items-center gap-1.5 rounded-card bg-emerald-600 px-3 py-2">
            <CheckIcon width={12} height={12} stroke="white" strokeWidth={3} />
            <span className="text-[11px] font-semibold text-white">
              Valid Permit{days !== null ? ` · ${days} days remaining` : ''}
            </span>
          </div>
        </div>

        {/* Delivery + actions */}
        <div className="flex flex-col gap-3">
          {/* WhatsApp delivery status */}
          <div className="rounded-card border border-ink-200 p-3.5">
            <div className="mb-2.5 text-[12px] font-semibold text-ink-700">
              Permit Delivery
            </div>
            {hasWhatsapp ? (
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 text-[18px]">📱</span>
                <div>
                  <div className="text-[12px] font-semibold text-emerald-600">
                    ✓ Sent via WhatsApp
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-ink-500">
                    {tanker.owner.whatsapp}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-card border border-amber-100 bg-amber-50 p-2.5">
                <div className="text-[12px] font-semibold text-amber-700">
                  ⚠ No WhatsApp number on record
                </div>
                <div className="mt-1 text-[11px] text-amber-600">
                  The permit cannot be sent automatically.
                </div>
                <div className="mt-1 font-mono text-[11px] text-ink-500">
                  {tanker.owner.phone}
                </div>
              </div>
            )}
          </div>

          <Button variant="primary" size="lg" className="w-full justify-center">
            View Permit Report
          </Button>
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<DownloadIcon width={14} height={14} />}
            className="w-full justify-center"
          >
            Download Permit (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
}
