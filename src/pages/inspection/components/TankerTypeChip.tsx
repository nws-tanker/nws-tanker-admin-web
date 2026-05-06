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

type Props = { type: InspectionTankerType };

export function TankerTypeChip({ type }: Props) {
  return <Chip tone={TONES[type]}>{LABELS[type]}</Chip>;
}
