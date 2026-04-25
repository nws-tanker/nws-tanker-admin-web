import type { Assignment, Inspector, SampleCollector, Tanker } from '@/types';
import { AssignInspectorForm } from './AssignInspectorForm';

export type AssignSubmitting = 'assign' | 'clear' | null;

type Props = {
  tanker: Tanker | null;
  clusterName: string;
  inspectors: Inspector[];
  samplers: SampleCollector[];
  submitting: AssignSubmitting;
  onSave: (tankerId: string, assignment: Assignment) => void;
  onClear: (tankerId: string) => void;
  onClose: () => void;
};

export function AssignInspectorModal({ tanker, ...rest }: Props) {
  if (!tanker) return null;

  // `key` resets form state whenever a different tanker is targeted,
  // without needing a useEffect to sync props → state.
  return <AssignInspectorForm key={tanker.id} tanker={tanker} {...rest} />;
}
