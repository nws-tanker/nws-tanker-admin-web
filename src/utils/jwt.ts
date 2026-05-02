import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from '@/types';

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isJwtExpired(
  payload: JwtPayload,
  nowSec: number = Math.floor(Date.now() / 1000),
): boolean {
  return payload.exp <= nowSec;
}
