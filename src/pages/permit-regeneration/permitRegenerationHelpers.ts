import type {
  ApprovedInspectionTankerType,
  ApprovedInspectionExpiryStatus,
} from '@/types/permitRegeneration';
import type { ChipTone } from '@/atoms';

export const TANKER_TYPE_LABEL: Record<ApprovedInspectionTankerType, string> = {
  drinking_water: 'Drinking Water',
  sewage_water: 'Sewage Water',
  treated_effluent: 'Treated Effluent',
};

export const TANKER_TYPE_TONE: Record<ApprovedInspectionTankerType, ChipTone> =
  {
    drinking_water: 'blue',
    sewage_water: 'amber',
    treated_effluent: 'green',
  };

export const TANKER_TYPE_OPTIONS: {
  value: ApprovedInspectionTankerType;
  label: string;
}[] = [
  { value: 'drinking_water', label: 'Drinking Water' },
  { value: 'sewage_water', label: 'Sewage Water' },
  { value: 'treated_effluent', label: 'Treated Effluent' },
];

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatExpiryDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

export function expiryColorClass(
  status: ApprovedInspectionExpiryStatus,
): string {
  if (status === 'expired') return 'text-red-600';
  if (status === 'expiring_soon') return 'text-amber-700';
  return 'text-ink-700';
}

export function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
