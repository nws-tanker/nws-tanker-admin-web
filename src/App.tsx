import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ProtectedRoute from '@/common-components/ProtectedRoute';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';
import FleetRegistryPage from '@/pages/fleet-registry';
import PlaceholderPage from '@/pages/placeholder';
import TankerUploadPage from '@/pages/tanker-upload';
import AuthenticationPage from '@/pages/authentication';
import ForbiddenPage from '@/pages/forbidden';
import ConfigurationPage from './pages/configuration';

export default function App() {
  useAuthBootstrap();

  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
      <Route path={ROUTES.authentication} element={<AuthenticationPage />} />
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
            <PlaceholderPage title="Operations" />
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
        path={ROUTES.inspectionReview}
        element={
          <ProtectedRoute route="inspectionReview">
            <PlaceholderPage title="Inspection Review" />
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
