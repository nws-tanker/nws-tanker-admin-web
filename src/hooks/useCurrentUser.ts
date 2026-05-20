import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsAuthenticated,
  selectIsBootstrapped,
} from '@/store/slices/authSlice';
import { fetchCurrentUser } from '@/store/apiSlices/currentUserApiSlice';
import { States } from '@/store/types';

export function useCurrentUser() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isBootstrapped = useAppSelector(selectIsBootstrapped);
  const currentUserState = useAppSelector((s) => s.currentUserApi);

  useEffect(() => {
    if (
      isAuthenticated &&
      isBootstrapped &&
      currentUserState.apiState === States.PRELOADING
    ) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, isBootstrapped, currentUserState.apiState, dispatch]);
}
