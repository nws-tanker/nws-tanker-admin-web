import type { FleetComplianceKpiResponse } from '@/types/fleetCompliance';
import { getHealthConfig } from '@/pages/dashboard/healthHelpers';
import TrendChart, { SVG_W } from './TrendChart';

type Props = { data: FleetComplianceKpiResponse['fleet_wide_compliance'] };

const DARK_BADGE: Record<string, { bg: string; text: string; dot: string }> = {
  on_track: {
    bg: 'rgba(52,211,153,0.2)',
    text: 'rgb(110,231,183)',
    dot: 'rgb(52,211,153)',
  },
  at_risk: {
    bg: 'rgba(251,191,36,0.2)',
    text: 'rgb(252,211,77)',
    dot: 'rgb(251,191,36)',
  },
  critical: {
    bg: 'rgba(248,113,113,0.2)',
    text: 'rgb(252,165,165)',
    dot: 'rgb(248,113,113)',
  },
};

export default function FleetComplianceBanner({ data }: Props) {
  const { compliance_rate, target, change } = data;
  const health = getHealthConfig(compliance_rate);
  const badge = DARK_BADGE[health.status];
  const isPositive = change.value >= 0;

  return (
    <div
      className="relative overflow-hidden rounded-card-lg px-8 py-7 text-white"
      style={{
        background:
          'linear-gradient(135deg, #02474E 0%, #0A5E66 50%, #117680 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          right: '-60px',
          top: '-60px',
          width: '280px',
          height: '280px',
          background: 'rgba(255,255,255,0.04)',
        }}
      />

      <div className="relative flex items-start justify-between gap-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/75">
            Fleet-wide Compliance
          </p>
          <div className="my-1.5 flex flex-wrap items-baseline gap-4">
            <span className="text-[68px] font-semibold leading-none tracking-[-0.04em]">
              {compliance_rate}%
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 text-xs font-semibold"
              style={{ background: badge.bg, color: badge.text }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: badge.dot }}
              />
              {health.label}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: isPositive ? '#6EE7B7' : '#FCA5A5' }}
            >
              {isPositive ? '▲' : '▼'} {Math.abs(change.value)} pts vs{' '}
              {change.vs_quarter}
            </span>
          </div>
        </div>

        <div className="shrink-0" style={{ width: SVG_W }}>
          <TrendChart target={target} />
        </div>
      </div>
    </div>
  );
}
