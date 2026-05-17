import type { InspectionTab, InspectionTabCounts } from '@/types/inspection';

type KpiConfig = {
  label: string;
  tab: InspectionTab;
  sub: string;
  valueClass: string;
};

const KPI_CONFIG: KpiConfig[] = [
  {
    label: 'Inspection Submitted',
    tab: 'submitted',
    sub: 'Submitted by inspector',
    valueClass: 'text-blue-600',
  },
  {
    label: 'Pending Review',
    tab: 'pending-review',
    sub: 'Awaiting CM decision',
    valueClass: 'text-teal-800',
  },
  {
    label: 'Pending Re-inspection',
    tab: 'pending-inspection',
    sub: 'Scheduled, not done yet',
    valueClass: 'text-cyan-600',
  },

  {
    label: 'Lab Testing',
    tab: 'lab-testing',
    sub: 'Awaiting lab results',
    valueClass: 'text-purple-600',
  },
  {
    label: 'Approved',
    tab: 'approved',
    sub: 'Permits issued',
    valueClass: 'text-green-700',
  },
  {
    label: 'Rejected',
    tab: 'rejected',
    sub: 'Failed / sent back',
    valueClass: 'text-red-600',
  },
];

const COUNT_MAP: Record<InspectionTab, keyof InspectionTabCounts> = {
  'pending-review': 'in_review',
  'pending-inspection': 'pending',
  submitted: 'submitted',
  'lab-testing': 'lab_pending',
  approved: 'approved',
  rejected: 'rejected',
};

type Props = {
  counts: InspectionTabCounts | null;
  activeTab: InspectionTab;
  onTabChange: (tab: InspectionTab) => void;
};

export function InspectionKpiStrip({ counts, activeTab, onTabChange }: Props) {
  return (
    <div className="mb-5 grid grid-cols-6 gap-3.5">
      {KPI_CONFIG.map((cfg) => {
        const isActive = activeTab === cfg.tab;
        const value = counts ? counts[COUNT_MAP[cfg.tab]] : null;
        return (
          <button
            key={cfg.tab}
            type="button"
            onClick={() => onTabChange(cfg.tab)}
            className={`rounded-card-lg border bg-white p-4 text-left shadow-card-sm transition-all hover:shadow-card-md ${
              isActive
                ? 'border-teal-700 ring-1 ring-teal-700'
                : 'border-ink-200'
            }`}
          >
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-500">
              {cfg.label}
            </div>
            <div
              className={`text-[28px] font-bold leading-none ${cfg.valueClass}`}
            >
              {value !== null ? value : '—'}
            </div>
            <div className="mt-1 text-[12px] text-ink-400">{cfg.sub}</div>
          </button>
        );
      })}
    </div>
  );
}
