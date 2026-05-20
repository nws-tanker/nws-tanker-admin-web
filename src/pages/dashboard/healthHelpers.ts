// Single source of truth for all health coloring, labels, and icons on the executive dashboard.
// Thresholds: ≥80% → on_track (green), 70–79% → at_risk (yellow/amber), <70% → critical (red)

export type HealthStatus = 'on_track' | 'at_risk' | 'critical';

export type HealthConfig = {
  status: HealthStatus;
  label: string;
  textClass: string; // Tailwind text color
  bgClass: string; // Tailwind background (heatmap cells, badge fills)
  borderClass: string; // Tailwind border color (card borders, pill borders)
  dotClass: string; // Tailwind bg for legend dots
  icon: 'check' | 'warning' | 'danger';
};

const HEALTH_MAP: Record<HealthStatus, HealthConfig> = {
  on_track: {
    status: 'on_track',
    label: 'On Track',
    textClass: 'text-green-700',
    bgClass: 'bg-green-100',
    borderClass: 'border-green-500',
    dotClass: 'bg-green-500',
    icon: 'check',
  },
  at_risk: {
    status: 'at_risk',
    label: 'At Risk',
    textClass: 'text-amber-700',
    bgClass: 'bg-amber-100',
    borderClass: 'border-amber-400',
    dotClass: 'bg-amber-400',
    icon: 'warning',
  },
  critical: {
    status: 'critical',
    label: 'Critical',
    textClass: 'text-red-700',
    bgClass: 'bg-red-100',
    borderClass: 'border-red-500',
    dotClass: 'bg-red-500',
    icon: 'danger',
  },
};

export function getHealthStatus(percentage: number): HealthStatus {
  if (percentage >= 80) return 'on_track';
  if (percentage >= 70) return 'at_risk';
  return 'critical';
}

export function getHealthConfig(percentage: number): HealthConfig {
  return HEALTH_MAP[getHealthStatus(percentage)];
}
