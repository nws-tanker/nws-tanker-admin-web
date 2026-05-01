import { useEffect, useState } from 'react';
import type { PendingRequest } from '../configurationHelpers';
import { fetchPendingUsersApi } from '@/services/configurationService';
import { States } from '@/store/types';

type PendingUsersState = {
  requests: PendingRequest[];
  state: States;
  retry: () => void;
};

export function usePendingUsers(): PendingUsersState {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [state, setState] = useState(States.LOADING);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState(States.LOADING);

    fetchPendingUsersApi().then((res) => {
      if (cancelled) return;
      if (res.success) {
        setRequests(res.data);
        setState(States.SUCCESS);
      } else {
        setState(States.ERROR);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const retry = () => setTick((n) => n + 1);

  return { requests, state, retry };
}
