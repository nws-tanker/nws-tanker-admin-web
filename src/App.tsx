import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES, firstAllowedPath } from '@/constants/routes';
import ProtectedRoute from '@/common-components/ProtectedRoute';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';
import { useAppSelector } from '@/store';
import {
  selectIsAuthenticated,
  selectIsBootstrapped,
  selectUserAccess,
} from '@/store/slices/authSlice';
import FleetRegistryPage from '@/pages/fleet-registry';
import PlaceholderPage from '@/pages/placeholder';
import TankerUploadPage from '@/pages/tanker-upload';
import AuthenticationPage from '@/pages/authentication';
import ForbiddenPage from '@/pages/forbidden';
import ConfigurationPage from './pages/configuration';
import InspectionPage from './pages/inspection';
import InspectionDetailsPage from '@/pages/inspection-details';
import OperationsPage from '@/pages/operations';

export default function App() {
  useAuthBootstrap();

  const isBootstrapped = useAppSelector(selectIsBootstrapped);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userAccess = useAppSelector(selectUserAccess);
  // Authenticated users can only access /auth page when they are logged out
  const authElement =
    isBootstrapped && isAuthenticated ? (
      <Navigate to={firstAllowedPath(userAccess)} replace />
    ) : (
      <AuthenticationPage />
    );

  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
      <Route path={ROUTES.authentication} element={authElement} />
      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />
      <Route
        path={ROUTES.fleetRegistry}
        element={
          <ProtectedRoute route="fleetRegistry">
            <FleetRegistryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.tankerUpload}
        element={
          <ProtectedRoute route="tankerUpload">
            <TankerUploadPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.inspectionReview}
        element={
          <ProtectedRoute route="inspectionReview">
            <InspectionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.inspectionDetails}
        element={
          <ProtectedRoute route="inspectionReview">
            <InspectionDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.dashboard}
        element={
          <ProtectedRoute route="dashboard">
            <PlaceholderPage title="Executive Dashboard" />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.operations}
        element={
          <ProtectedRoute route="operations">
            <OperationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.fleetCompliance}
        element={
          <ProtectedRoute route="fleetCompliance">
            <PlaceholderPage title="Fleet Compliance" />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.permitRenewal}
        element={
          <ProtectedRoute route="permitRenewal">
            <PlaceholderPage title="Permit Renewal" />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.reports}
        element={
          <ProtectedRoute route="reports">
            <PlaceholderPage title="Reports" />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.configuration}
        element={
          <ProtectedRoute route="configuration">
            <ConfigurationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
    </Routes>
  );
}
