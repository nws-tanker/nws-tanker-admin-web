import type { CSSProperties } from 'react';
import type { OperationsSummary } from '@/types';

export const BANNER_GRADIENT = {
  background: 'linear-gradient(135deg, #02474E 0%, #0A5E66 60%, #117680 100%)',
} as const;

const CIRCLE_TOP: CSSProperties = {
  right: -40,
  top: -40,
  width: 240,
  height: 240,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.04)',
};

const CIRCLE_BOTTOM: CSSProperties = {
  right: 40,
  bottom: -60,
  width: 180,
  height: 180,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.03)',
};

type Props = {
  summary: OperationsSummary;
};

type Stat = { label: string; value: string; valueClass?: string };

export function FleetBanner({ summary }: Props) {
  const { fleet, compliance } = summary;

  const typeStats: Stat[] = [
    { label: 'Drinking Water', value: fleet.drinking_water.toLocaleString() },
    { label: 'Sewage Water', value: fleet.sewage_water.toLocaleString() },
    {
      label: 'Treated Effluent',
      value: fleet.treated_effluent.toLocaleString(),
    },
  ];

  const rightStats: Stat[] = [
    {
      label: 'Fleet Compliance',
      value: `${compliance.pass_rate}%`,
      valueClass: 'text-emerald-300',
    },
    {
      label: 'Lab SLA',
      value: `${compliance.lab_sla_rate}%`,
      valueClass: 'text-yellow-400',
    },
    {
      label: 'Lab Overdue',
      value: String(compliance.lab_overdue_count),
      valueClass: 'text-red-400',
    },
  ];

  return (
    <div
      className="relative mb-5 overflow-hidden rounded-card-lg px-6 py-5 text-white"
      style={BANNER_GRADIENT}
    >
      <div className="pointer-events-none absolute" style={CIRCLE_TOP} />
      <div className="pointer-events-none absolute" style={CIRCLE_BOTTOM} />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-12">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/70">
              Total Fleet
            </div>
            <div className="mt-0.5 text-[34px] font-semibold tracking-tight">
              {fleet.total.toLocaleString()}{' '}
              <span className="text-[14px] font-normal text-white/75">
                tankers
              </span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/15" />
          <div className="flex gap-9">
            {typeStats.map((s) => (
              <div key={s.label}>
                <div className="text-[11px] text-white/70">{s.label}</div>
                <div className="mt-0.5 text-[22px] font-semibold tabular-nums">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-5 text-right">
          {rightStats.map((s) => (
            <div key={s.label}>
              <div className="text-[11px] text-white/70">{s.label}</div>
              <div
                className={`text-[20px] font-semibold ${s.valueClass ?? ''}`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
