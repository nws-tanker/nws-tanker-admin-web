import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES, type RouteKey } from '@/constants/routes';
import { useAppSelector } from '@/store';
import {
  selectCanAccessRoute,
  selectIsAuthenticated,
  selectIsBootstrapped,
} from '@/store/slices/authSlice';

type ProtectedRouteProps = {
  route: RouteKey;
  children: ReactNode;
};

export default function ProtectedRoute({
  route,
  children,
}: ProtectedRouteProps) {
  const isBootstrapped = useAppSelector(selectIsBootstrapped);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const canAccess = useAppSelector(selectCanAccessRoute(route));

  if (!isBootstrapped) return null;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.authentication} replace />;
  }

  if (!canAccess) {
    return <Navigate to={ROUTES.forbidden} replace />;
  }

  return <>{children}</>;
}
