import { useCallback, useState } from 'react';
import { useToast } from '@/atoms';
import { submitTankerUploadApi } from '@/services/tankerUploadService';
import type { TankerUploadResponse } from '@/types';

type Phase =
  | { kind: 'idle' }
  | { kind: 'processing'; fileName: string }
  | { kind: 'done'; fileName: string; result: TankerUploadResponse };

export function useTankerUploadFlow() {
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });
  const { show: showToast } = useToast();

  const submit = useCallback(
    async (file: File) => {
      setPhase({ kind: 'processing', fileName: file.name });
      const response = await submitTankerUploadApi(file);
      if (response.success) {
        setPhase({ kind: 'done', fileName: file.name, result: response.data });
      } else {
        setPhase({ kind: 'idle' });
        showToast(response.error.description, { tone: 'error' });
      }
    },
    [showToast],
  );

  const reset = useCallback(() => setPhase({ kind: 'idle' }), []);

  return { phase, submit, reset };
}
