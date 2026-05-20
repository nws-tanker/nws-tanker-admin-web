import { useCallback, useState } from 'react';
import { useToast } from '@/atoms';
import { updateGovernorateClusterMappingApi } from '@/services/configurationService';
import type { ClusterSetupGovernorate } from '@/types/configuration';
import { buildMappingsPayload } from './governorateAssignmentHelpers';

export function useGovAssignmentSave(
  governorates: ClusterSetupGovernorate[],
  assignments: Record<string, number>,
  onSuccess: () => void,
) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const response = await updateGovernorateClusterMappingApi({
        mappings: buildMappingsPayload(governorates, assignments),
      });
      if (response.success) {
        toast.show('Governorate assignments saved');
        onSuccess();
      } else {
        toast.show(
          response.error?.description ?? 'Failed to save assignments',
          { tone: 'error' },
        );
      }
    } catch {
      toast.show('Failed to save assignments', { tone: 'error' });
    } finally {
      setSaving(false);
    }
  }, [governorates, assignments, onSuccess, toast]);

  return { save, saving };
}
