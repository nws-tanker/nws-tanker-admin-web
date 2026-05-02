import { useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { useAppDispatch } from '@/store';
import { clearAuth, setAuth } from '@/store/slices/authSlice';
import { decodeJwt, isJwtExpired } from '@/utils';

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.jwt);
    if (!token) {
      dispatch(clearAuth());
      return;
    }

    const payload = decodeJwt(token);
    if (!payload || isJwtExpired(payload)) {
      localStorage.removeItem(STORAGE_KEYS.jwt);
      dispatch(clearAuth());
      return;
    }

    dispatch(setAuth({ token, payload }));
  }, [dispatch]);
}
