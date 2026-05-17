import type { ExecutiveKpis } from '@/types/dashboard';
import { formatNumber, formatPct } from '../executiveDashboardHelpers';
import { MetricCard } from './MetricCard';

type Props = {
  kpis: ExecutiveKpis | null;
};

export function ExecutiveKpiStrip({ kpis }: Props) {
  if (!kpis) {
    return (
      <section className="mb-5 grid grid-cols-6 gap-3.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="h-[120px] animate-pulse rounded-card-lg border border-ink-200 bg-ink-100"
          />
        ))}
      </section>
    );
  }

  const { fleetByType } = kpis;

  return (
    <section className="mb-5 grid grid-cols-6 gap-3.5">
      <MetricCard
        variant="primary"
        label="Total Fleet"
        value={formatNumber(kpis.totalFleet)}
        sub={
          <span>
            DW {formatNumber(fleetByType.dw)} · SW{' '}
            {formatNumber(fleetByType.sw)} · TE {formatNumber(fleetByType.te)}
          </span>
        }
      />
      <MetricCard
        label="Compliance Rate"
        value={formatPct(kpis.complianceRate)}
        sub={`Target ≥ ${formatPct(kpis.complianceTarget)}`}
        footer="On track"
      />
      <MetricCard
        label="Inspection Pass Rate"
        value={formatPct(kpis.inspectionPassRate)}
        sub="Rolling 30-day"
        footer="Healthy"
      />
      <MetricCard
        label="Lab SLA Adherence"
        value={formatPct(kpis.labSlaAdherence)}
        sub="Rolling 30-day · lab tests only"
      />
      <MetricCard
        label="Expiring ≤ 30 days"
        value={formatNumber(kpis.expiringIn30Days)}
        sub="Renewal queue"
      />
      <MetricCard
        label="Expired Permits"
        value={formatNumber(kpis.expiredPermits)}
        sub={`${formatPct((kpis.expiredPermits / Math.max(kpis.totalFleet, 1)) * 100)} of fleet`}
        footer={
          kpis.expiredPermitsCriticalCluster > 0
            ? `Action required · ${formatNumber(kpis.expiredPermitsCriticalCluster)} in Cluster 3`
            : undefined
        }
      />
    </section>
  );
}
