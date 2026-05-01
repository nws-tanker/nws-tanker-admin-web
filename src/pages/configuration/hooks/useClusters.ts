import { useEffect, useState } from 'react';
import type { SelectOption } from '@/atoms';
import { fetchClusters } from '@/services/configurationService';
import { States } from '@/store/types';

type ClustersState = {
  clusterOptions: SelectOption[];
  state: States;
};

export function useClusters(): ClustersState {
  const [clusterOptions, setClusterOptions] = useState<SelectOption[]>([]);
  const [state, setState] = useState(States.LOADING);

  useEffect(() => {
    let cancelled = false;
    setState(States.LOADING);

    fetchClusters().then((res) => {
      if (cancelled) return;
      if (res.success) {
        setClusterOptions(
          res.data.map((c) => ({ value: String(c.id), label: c.name })),
        );
        setState(States.SUCCESS);
      } else {
        setState(States.ERROR);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { clusterOptions, state };
}
