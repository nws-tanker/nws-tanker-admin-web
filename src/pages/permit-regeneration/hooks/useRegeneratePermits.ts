import { useCallback, useRef, useState } from 'react';
import { useToast } from '@/atoms';
import { regeneratePermitsApi } from '@/services/permitRegenerationService';
import { REGENERATE_PERMITS_DEFAULTS } from '../constants';

type Options = {
  /** Called after a successful regenerate so the page can refetch / clear selection. */
  onSuccess?: () => void;
};

export function useRegeneratePermits({ onSuccess }: Options = {}) {
  const toast = useToast();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const inFlight = useRef(false);

  const regenerate = useCallback(
    async (inspectionIds: number[]) => {
      if (inspectionIds.length === 0 || inFlight.current) return;
      inFlight.current = true;
      setIsRegenerating(true);
      try {
        const response = await regeneratePermitsApi({
          inspection_ids: inspectionIds,
          send_email: REGENERATE_PERMITS_DEFAULTS.sendEmail,
          send_whatsapp: REGENERATE_PERMITS_DEFAULTS.sendWhatsapp,
        });
        if (response.success) {
          const count =
            response.data?.regenerated_count ?? inspectionIds.length;
          toast.show(
            `Regenerated ${count} permit${inspectionIds.length === 1 ? '' : 's'}`,
          );
          onSuccess?.();
        } else {
          toast.show(
            response.error?.description ?? 'Failed to regenerate permits',
            { tone: 'error' },
          );
        }
      } catch {
        toast.show('Failed to regenerate permits', { tone: 'error' });
      } finally {
        inFlight.current = false;
        setIsRegenerating(false);
      }
    },
    [onSuccess, toast],
  );

  return { isRegenerating, regenerate };
}
