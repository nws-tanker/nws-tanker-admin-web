import { Chip } from '@/atoms';
import type { InspectionTankerType } from '@/types/inspection';

const LABELS: Record<InspectionTankerType, string> = {
  DW: 'Drinking Water',
  SW: 'Sewage Water',
  TE: 'Treated Effluent',
};

const TONES = {
  DW: 'blue',
  SW: 'amber',
  TE: 'green',
} as const;

type Props = {
  type: InspectionTankerType;
  compact?: boolean;
};

export function TankerTypeChip({ type, compact = false }: Props) {
  return <Chip tone={TONES[type]}>{compact ? type : LABELS[type]}</Chip>;
}
