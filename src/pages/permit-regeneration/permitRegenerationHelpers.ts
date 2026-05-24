import type {
  ApprovedInspectionTankerType,
  ApprovedInspectionExpiryStatus,
} from '@/types/permitRegeneration';
import { TYPE_LABELS } from '@/constants/fleet';

export const TANKER_TYPE_OPTIONS: {
  value: ApprovedInspectionTankerType;
  label: string;
}[] = [
  { value: 'drinking_water', label: TYPE_LABELS.drinking_water },
  { value: 'sewage_water', label: TYPE_LABELS.sewage_water },
  { value: 'treated_effluent', label: TYPE_LABELS.treated_effluent },
];

export function expiryColorClass(
  status: ApprovedInspectionExpiryStatus,
): string {
  if (status === 'expired') return 'text-red-600';
  if (status === 'expiring_soon') return 'text-amber-700';
  return 'text-ink-700';
}
