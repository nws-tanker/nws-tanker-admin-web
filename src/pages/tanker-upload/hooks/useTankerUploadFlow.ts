import { useCallback, useState } from 'react';
import { useToast } from '@/atoms';
import { submitTankerUploadApi } from '@/services/tankerUploadService';
import type { TankerUploadResponse } from '@/types';

type Phase =
  | { kind: 'idle' }
  | { kind: 'processing'; fileName: string }
  | { kind: 'done'; result: TankerUploadResponse };

export function useTankerUploadFlow() {
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });
  const { show: showToast } = useToast();

  const submit = useCallback(
    async (file: File) => {
      setPhase({ kind: 'processing', fileName: file.name });
      const response = await submitTankerUploadApi(file);
      if (response.success) {
        setPhase({ kind: 'done', result: response.data });
      } else {
        setPhase({ kind: 'idle' });
        showToast(response.error.description, { tone: 'error' });
      }
    },
    [showToast],
  );

  const reset = useCallback(() => setPhase({ kind: 'idle' }), []);

  /** Locally drop a row from the displayed errors (e.g. user clicked "Skip"). */
  const dismissError = useCallback((rowNumber: number) => {
    setPhase((prev) => {
      if (prev.kind !== 'done') return prev;
      const errors = prev.result.errors.filter(
        (e) => e.rowNumber !== rowNumber,
      );
      return {
        kind: 'done',
        result: {
          ...prev.result,
          errors,
          importedCount: prev.result.importedCount + 1,
        },
      };
    });
  }, []);

  return { phase, submit, reset, dismissError };
}
