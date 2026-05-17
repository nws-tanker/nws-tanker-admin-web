import type { InspectionTab, InspectionTabCounts } from '@/types/inspection';
import { cn } from '@/utils';

type TabDef = {
  key: InspectionTab;
  label: string;
  alert: boolean;
};

const TABS: TabDef[] = [
  { key: 'submitted', label: 'Inspection Submitted', alert: true },
  { key: 'pending-review', label: 'Pending Review', alert: true },
  { key: 'pending-inspection', label: 'Pending Re-inspection', alert: true },
  { key: 'lab-testing', label: 'Lab Testing', alert: true },
  { key: 'approved', label: 'Approved', alert: false },
  { key: 'rejected', label: 'Rejected', alert: false },
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
  activeTab: InspectionTab;
  counts: InspectionTabCounts | null;
  onChange: (tab: InspectionTab) => void;
};

export function InspectionTabs({ activeTab, counts, onChange }: Props) {
  return (
    <div className="mb-5 flex gap-0 border-b-2 border-ink-200">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts ? counts[COUNT_MAP[tab.key]] : null;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              'mb-[-2px] whitespace-nowrap px-5 py-[9px] text-[13px] font-medium transition-colors',
              isActive
                ? 'border-b-2 border-teal-800 text-teal-900'
                : 'text-ink-500 hover:text-ink-800',
            )}
          >
            {tab.label}{' '}
            <span
              className={cn(
                'ml-1.5 rounded-[10px] px-1.5 py-px text-[11px]',
                isActive && tab.alert && count !== null && count > 0
                  ? 'bg-teal-900 text-white'
                  : 'bg-ink-100 text-ink-600',
              )}
            >
              {count !== null ? count : '—'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
