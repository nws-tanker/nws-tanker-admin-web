import { useState } from 'react';
import type { Assignment } from '@/types';

type Params = {
  initial?: Assignment;
  canCollectSample: boolean;
  onSubmit: (assignment: Assignment) => void;
  onError: (message: string) => void;
};

export function useAssignInspectorForm({
  initial,
  canCollectSample,
  onSubmit,
  onError,
}: Params) {
  const [inspectorId, setInspectorId] = useState(initial?.inspectorId ?? '');
  const [samplerId, setSamplerId] = useState(initial?.samplerId ?? '');

  const submit = () => {
    if (!inspectorId) {
      onError('Please select an inspector.');
      return;
    }
    onSubmit({
      inspectorId,
      samplerId: canCollectSample && samplerId ? samplerId : null,
    });
  };

  return {
    inspectorId,
    samplerId,
    setInspectorId,
    setSamplerId,
    submit,
  };
}
